const db       = require("../models"),
      passport = require("passport");

exports.signup = async (req, res, next) => {
  try{
    let createdUser = await db.User.create(req.body);
    return res.send(createdUser);
  } catch (err) {
    return next(err);
  }
}