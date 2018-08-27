const db       = require("../models"),
      passport = require("passport");

exports.signup = async (req, res, next) => {
  try{
    if (req.isAuthenticated()) {
      res.redirect("/user")
    } else {
      res.render('signup', {
        message: "",
        email: "",
        username: "",
        linkedIn: "",
        phone: ""
      });
    }
  } catch(err) {
    return next(err);
  }
}

exports.create = async (req, res, next) => {
  try{
    if (req.isAuthenticated()) {
      res.redirect("/user");
    } else {
      const { username, email, phone, password } = req.body;
      db.User.register(new db.User({username, email, phone}), password, (err, newUser) => {
        if (!err) {
          passport.authenticate("local")(req, res, function(){
            res.redirect("/user/edit");
          });
        } else {
          let errorMessage = "";
          if (err.name === "UserExistsError") {
            errorMessage = err.message;
          } else if (err.name === "ValidationError") {
            errorMessage = err.errors.email.message;
          }   
          res.render('signup', {
            message: errorMessage,
            email,
            username,
            linkedIn: "",
            phone         
          })
        }
      });
    }
  } catch(err) {
    return next(err);
  }
}

exports.login = async (req, res, next) => {
  try{
    if (req.isAuthenticated()) {
      res.redirect("/user");
    } else {
      res.render('signin');
    }   
  } catch(err) {
    return next(err);
  }
}

exports.authenticate = async (req, res, next) => {
  try{
    res.send("How did you get here?");
  } catch (err) {
    return next(err);
  }
}

exports.logout = async (req, res, next) => {
  try{
    req.logout();
    res.redirect("/auth/login");
  } catch(err) {
    return next(err);
  }
}