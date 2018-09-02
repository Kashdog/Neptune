const mongoose = require("mongoose"),
      validate = require("validator"),
      plm      = require("passport-local-mongoose"),
      db       = require("./index"),
      conn     = require("./connection");

const connectionSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: [true, "A sender is required."]
  },
  receiver: {
      type: String,
      required: [true, "A receiver is required."]
  },
  pending: {
      type: Boolean,
      required: [true, "A pending status is required."]
  }
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "An email address is required."],
    validate: {
      validator: async function(val) {
        try {
          let existingEmail = await db.User.findOne({email: val}) 
          if (!existingEmail){
            return true;
          } else {
            return false;
          }
        } catch (err) {
          return next(err);
        }        
      },
      name: "EmailExistsError",
      message: "This email address is already taken."
    }
  },
  username: {
    type: String,
    required: [true, "A username is required."]
  },
  name: {
    type: String
  },
  password: {
    type: String
  },
  phone: {
    type: String,
    required: [true, "A phone number is required."]
  },
  connections : [connectionSchema],
  facebook: {
    id: String,
    token: String
  },
  location: {
    type: String
  },
  title: {
    type: String
  },
  github: {
    type: String
  },
  linkedin: {
    type: String
  },
  profilepic: {
    type: String
  },
  resume: {
    type: String
  },
  bio: {
    type: String
  }
});

userSchema.plugin(plm, {errorMessages: {
  UserExistsError: "This username is already taken."
}});
const User = mongoose.model("User", userSchema);
module.exports = User;