const mongoose = require("mongoose");

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
    unique: true,,
    maxlength: 30
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 30
  }
})