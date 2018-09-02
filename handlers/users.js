const db = require('../models');

exports.index = async (req, res, next) => {
  try {
    console.log(req.user.profilepic);
    res.render("profile", {name: req.user.name, title: req.user.title, phonenumber: req.user.phone, email: req.user.email, location: req.user.location, username: req.user.username, bio: req.user.bio, profilepic: req.user.profilepic, resume: req.user.resume})
  } catch(err) {
    return next(err);
  }
  
}

exports.edit = async (req, res, next) => {
  try {
      res.render('createprofile', { "user": req.user });
  } catch(err) {
    return next(err);
  }
}

exports.update = async (req, res, next) => {
  try {
    console.log(req.user);
    const userinfo = {
      name: req.body.name,
      profilepic: req.body.profilepic,
      location: req.body.location,
      title: req.body.title,
      bio: req.body.bio,
      phone: req.body.phonenumber,
      linkedin: req.body.linkedin,
      github: req.body.github,
      resume: req.body.resume
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