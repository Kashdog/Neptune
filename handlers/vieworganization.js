const neo4j = require('neo4j-driver').v1;
      var uuid = require('node-uuid');
      var randomstring = require("randomstring");
      var dbUtils = require('../neo4j/dbUtils');
      var User = require('../models/neo4j/user');
      var _ = require('lodash');
      var crypto = require('crypto');

      var driver = neo4j.driver('bolt://35.236.93.234:7687', neo4j.auth.basic("neo4j", 'feanarocurufinwe123$#'));
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
      return session.run("MATCH (a:User {id: {userId}}) -[r:memberOf]-> (b:Group {type: 'organization', name: {profileToView} }) RETURN b ",
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
      
      console.log("This is the result to view the profile of an organization", result[0].get(0));
      if (result.length == 0){
        res.redirect("/contacts/groups/organizations")
      } else{
        organization = result[0].get(0);
        res.render("organizationprofile", {name: organization.properties.name, website: organization.properties.website, location: organization.properties.location, email: organization.properties.email, logo: organization.properties.logo, moderatorusername: organization.properties.moderatorusername});
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
          console.log("this is the Organization Members page");
          var getMembers = function (session) {
              return session.run("MATCH (u:Group {type: 'organization', name: {organization}})<-[:memberOf]-(n:User) WHERE NOT n.id = {id} RETURN n", 
            {
              id: req.session.userId,
              organization: req.params.name
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
              res.render('organizationmembers.ejs', { "users": allMembers ,"group": req.params.name});
          });
      }
  } catch(err) {
    return next(err);
  }
  
}

module.exports = exports;