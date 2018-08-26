const db       = require("../models"),
      passport = require("passport");

<<<<<<< HEAD
exports.signup = async (req, res, next) => {
  try{
    let createdUser = await db.User.create(req.body);
    return res.send(createdUser);
  } catch (err) {
    return next(err);
  }
=======
exports.signup = (req, res, next) => {
  res.render('loginsignup');
>>>>>>> 4cbe7281093e315a500dca6dcc776efac66e3def
}