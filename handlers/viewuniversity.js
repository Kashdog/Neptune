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
    if(!req.session.userId || req.session.userId == ""){
      console.log("true");
      res.redirect("/auth/login");
    }
    console.log(req.session.userId);
    console.log('req.params', req.params.username);
    var getMatchedUser = function (session) {
      return session.run("MATCH (n:User{id: {userId}}) RETURN n",
      {
        userId: req.session.userId,
      })
        .then(results => {
          return results.records[0].get(0);
        })
    };
    var findConnectionMatch = function (session) {
      return session.run("MATCH (a:User {id: {userId}}) -[r:studiedAt]-> (b:Group {type: 'university', name: {profileToView} }) RETURN b ",
      {
        userId: req.session.userId,
        profileToView: req.params.name
      })
        .then(results => {
          return results.records;
        })
    };
    var match = findConnectionMatch(session);
    match.then(function(result) {
      
      console.log("This is the result to view the profile", result[0].get(0));
      if (result.length == 0){
        res.redirect("/contacts/groups/universities")
      } else{
        university = result[0].get(0);
        res.render("universityprofile", {name: university.properties.name, website: university.properties.website, location: university.properties.location, email: university.properties.email, logo: university.properties.logo, moderatorusername: university.properties.moderatorusername});
      }
    });
  } catch(err) {
    return next(err);
  }
  
}


exports.viewmembers = async (req, res, next) => {
  try {
      console.log('params', req.params.name);
      if(!req.session.userId || req.session.userId == ""){
          console.log("true");
          res.redirect("/auth/login");
      } else{
          console.log("this is the University Members page");
          var getMembers = function (session) {
              return session.run("MATCH (u:Group {type: 'university', name: {university}})<-[:studiedAt]-(n:User) WHERE NOT n.id = {id} RETURN n", 
            {
              id: req.session.userId,
              university: req.params.name
            })
              .then(results => {
                  return results.records;
              })
          };
          var allMembers = [];
          var members = getMembers(session);
          members.then(function(result) {
              console.log("Member Result", result)
              for(var i = 0; i < result.length; i++){
                  allMembers.push(result[i].get(0).properties);
              }
              console.log("These are the members", allMembers);
              console.log("number of members", allMembers.length);
              res.render('members.ejs', { "users": allMembers ,"group": req.params.name});
          });
      }
  } catch(err) {
    return next(err);
  }
  
}

module.exports = exports;