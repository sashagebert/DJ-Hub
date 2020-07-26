const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: uuid.v4(),
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  region: {
    type: String,
  },
  bio: {
    type: String,
  },
  likedPosts: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
