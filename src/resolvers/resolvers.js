import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Contact from '../model/contacts';
import User from '../model/users';

const resolvers = {
  Query: {
    contacts: (_, { first, skip }, context) => {
      try {
        if (!context.token) throw new Error('Invalid token');

        const query = Contact.find().sort({ name: "asc" });
        
        if (first) query.limit(first);
        
        if (skip) query.skip(skip);
        
        return query;
      } catch (error) {
        throw new Error(error);
      }
    },
    contact: (_, { id }) => Contact.findById(id).sort({ name: "asc" }),
  },
  Mutation: {
    login: async (root, { email, password }) => {
      try {       
        const user = await User.findOne({ email }).lean();

        if (!user) throw new Error(`${email} is not registered`);
        
        const isPasswordValid = bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) throw new Error('Invalid password');
        
        user.password = undefined;
        const token = jwt.sign({ userId: user.id }, 'SECRET');

        return {
          user,
          token
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    register: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        
        if (user) throw new Error(`User with email ${email} is already registered`);

        const newUser = await User.create({ email, password });
        await newUser.save();

        return newUser;
      } catch (err) {
        throw new Error(err);
      }
    },
    createContact: (_, { name, phone, email, mobilephone, mailingAddress }, context) => {
      if (!context.token) throw new Error('Invalid token');
      return Contact.create({ name, phone, email, mobilephone, mailingAddress });
    },
    updateContact: (_, { id, ...payload }, context) => {
      if (!context.token) throw new Error('Invalid token');
      return Contact.findByIdAndUpdate({ _id: id }, { ...payload });
    },
    deleteContact: (_, { id }, context) => {
      if (!context.token) throw new Error('Invalid token');
      return Contact.findByIdAndDelete(id);
    },
  },
};

export default resolvers;
