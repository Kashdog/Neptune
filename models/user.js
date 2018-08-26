const mongoose = require("mongoose"),
      validate = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 30,
    validate: [validate.isEmail, "Please enter a valid email address."]
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 30
  },
  bio: {
    type: String
  },
  contacts: {
    type: String
  },
  pendingInvites: {
    type: String
  },
  location: {
    type: String
  },
  title: {
    type: String
  },
  website: {
    type: String
  },
  profilePictureUrl: {
    type: String
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;