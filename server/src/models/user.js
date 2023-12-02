const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

const googleUserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
})

const User = mongoose.model('User', userSchema);
const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);

module.exports = User,GoogleUser;