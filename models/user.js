const mongoose = require("mongoose"),
      validate = require("validator"),
      plm      = require("passport-local-mongoose"),
      db       = require("./index");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "An email address is required."],
    validate: {
      validator: async function(val) {
        let existingEmail = await db.User.findOne({email: val}) 
        if (!existingEmail){
          return true;
        } else {
          return false;
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
  password: {
    type: String
  },
  phone: {
    type: String,
    required: [true, "A phone number is required."]
  },
  facebook         : {
    id           : String,
    token        : String
  },
});

userSchema.plugin(plm, {errorMessages: {
  UserExistsError: "This username is already taken."
}});
const User = mongoose.model("User", userSchema);
module.exports = User;


// TO BE IMPLIMENTED!
// firstName: {
//   type: String,
//   minlength: 2,
//   maxlength: 30
// },
// lastName: {
//   type: String,
//   minlength: 2,
//   maxlength: 30
// },
// bio: {
//   type: String
// },
// contacts: {
//   type: String
// },
// pendingInvites: {
//   type: String
// },
// location: {
//   type: String
// },
// title: {
//   type: String
// },
// website: {
//   type: String
// },
// profilePictureUrl: {
//   type: String
// }