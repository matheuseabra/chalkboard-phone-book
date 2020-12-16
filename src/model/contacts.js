import mongoose, { Schema } from 'mongoose';

const ContactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  mobilephone: String,
  mailingAddress: String
});

export default mongoose.model('Contact', ContactSchema);
