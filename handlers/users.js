const neo4j = require('neo4j-driver').v1;
      var uuid = require('node-uuid');
      var randomstring = require("randomstring");
      var dbUtils = require('../neo4j/dbUtils');
      var User = require('../models/neo4j/user');
      var _ = require('lodash');
      var crypto = require('crypto');

      var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic("neo4j", 'kunju123'));
      var session = driver.session();
      
exports.index = (req, res, next) => {
  try {
    console.log(req.session.userId);
    if(!req.session.userId || req.session.userId == ""){
      console.log("true");
      res.redirect("/auth/login");
    } else{
      var getCurrentUser = function (session) {
        return session.run("MATCH (n:User{id: {userId}}) RETURN n",
        {
          userId: req.session.userId,
        })
          .then(results => {
            return results.records[0].get(0);
          })
      };
      var currentUser = getCurrentUser(session);
      currentUser.then(function(result) {
        console.log(result.properties.username);
        res.render("profile", {name: result.properties.name, title: result.properties.title, phonenumber: result.properties.phone, email: result.properties.email, location: result.properties.location, username: result.properties.username, bio: result.properties.bio, profilepic: result.properties.profilepic, resume: result.properties.resume});
     })
    }
  } catch(err) {
    return next(err);
  }
  
}

exports.edit =  async (req, res, next) => {
  var getCurrentUser = function (session) {
    return session.run("MATCH (n:User{id: {userId}}) RETURN n",
    {
      userId: req.session.userId,
    })
      .then(results => {
        return results.records[0].get(0);
      })
  };
  var currentUser = getCurrentUser(session);
  await currentUser.then(function(result) {
    console.log(result.properties.username);
    res.render("createprofile", {username: result.properties.username});
 })
}

exports.update = async (req, res, next) => {
  try {
    var register = function (session) {
      return session.run("MATCH (n:User) WHERE n.id =~ {id} SET n.name = {name} SET n.username = {username} SET n.profilepic = {profilepic} SET n.location = {location} SET n.title = {title} SET n.phonenumber = {phonenumber} SET n.bio = {bio} SET n.linkedin = {linkedin} SET n.github = {github} SET n.resume = {resume} RETURN n",
      {
        id: req.session.userId,
        username: req.body.username,
        name: req.body.name,
        profilepic: req.body.profilepic,
        location: req.body.location,
        title: req.body.title,
        phonenumber: req.body.phonenumber,
        bio: req.body.bio,
        linkedin: req.body.linkedin,
        github: req.body.github,
        resume: req.body.resume
      })
        .then(results => {
          console.log(results.records);
        })
    };
    register(session);
    res.redirect('/user/')
    /*console.log(req.user);
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
    });*/
  } catch(err) {
    return next(err);
  }
}

module.exports = exports;