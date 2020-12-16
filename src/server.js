import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';
import fs from 'fs';
import resolvers from './resolvers/resolvers';

mongoose.connect('mongodb://localhost:27017/phone-book-graphql', {
  useNewUrlParser: true,
});

const context = ({ req }) => {
 const token = req.headers.authorization || '';
 return {token};
}

const typeDefs = gql(fs.readFileSync(__dirname.concat('/schema/schema.graphql'), 'utf8'));

const server = new ApolloServer ({
  typeDefs,
  resolvers,
  context,
  introspection: true,
  playground: true,
  cors: false,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url} 🚀`);
});
