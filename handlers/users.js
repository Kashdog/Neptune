const neo4j = require('neo4j-driver').v1;
      var uuid = require('node-uuid');
      var randomstring = require("randomstring");
      var dbUtils = require('../neo4j/dbUtils');
      var User = require('../models/neo4j/user');
      var _ = require('lodash');
      var crypto = require('crypto');

      var driver = neo4j.driver('bolt://35.236.104.204:7687', neo4j.auth.basic("neo4j", 'feanarocurufinwe123$#'));
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
        res.render("profile", {name: result.properties.name, title: result.properties.title, phonenumber: result.properties.phonenumber, email: result.properties.email, location: result.properties.location, username: result.properties.username, bio: result.properties.bio, profilepic: result.properties.profilepic, resume: result.properties.resume});
     })
    }
  } catch(err) {
    return next(err);
  }
  
}

exports.edit =  async (req, res, next) => {
  console.log(req.session);
  console.log("this is the userID", req.session.userId);
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
    await currentUser.then(function(result) {
      console.log(result.properties.username);
      res.render("createprofile", {username: result.properties.username, message: ""});
  })
}
}

exports.update = async (req, res, next) => {
  try {
    console.log(req.body);                            
    var register = function (session) {
      return session.run("MATCH (n:User) WHERE n.id =~ {id} SET n.name = {name} SET n.profilepic = {profilepic} SET n.location = {location} SET n.title = {title} SET n.bio = {bio} SET n.linkedin = {linkedin} SET n.github = {github} SET n.resume = {resume} RETURN n",
      {
        id: req.session.userId,
        name: req.body.name,
        profilepic: req.body.profilepic,
        location: req.body.location,
        title: req.body.title,
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
  } catch(err) {
    return next(err);
  }
}

module.exports = exports;