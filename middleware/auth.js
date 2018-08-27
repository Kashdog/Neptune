const passport = require('passport');

exports.auth = passport.authenticate("local", {
  successRedirect: "/user/",
  failureRedirect: "/auth/login"
});

exports.isValidated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/auth/login");
  } else {
    return next();
  }
}

module.exports = exports;