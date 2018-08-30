const db = require('../models');

exports.index = async (req, res, next) => {
  try {
    res.render("profile", {name: req.user.name, title: req.user.title})
  } catch(err) {
    return next(err);
  }
  
}

exports.edit = async (req, res, next) => {
  try {
    res.render("createprofile")
  } catch(err) {
    return next(err);
  }
}

exports.update = async (req, res, next) => {
  try {
    console.log(req.user);
    const userinfo = {
      name: req.body.name,
      location: req.body.location,
      title: req.body.title,
      phone: req.body.phonenumber,
      linkedin: req.body.linkedin,
      github: req.body.github
    };
    db.User.updateOne({_id: req.user._id}, userinfo, function(err, raw) {
      if (err) {
        res.send(err);
      }
      res.redirect('/user/')
    });
  } catch(err) {
    return next(err);
  }
}

module.exports = exports;