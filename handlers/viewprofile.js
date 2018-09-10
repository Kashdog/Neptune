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
            return session.run("MATCH (a:User {id: {userId}}) -[r:connectedTo]-> (b:User {username: {profileToView}}) RETURN b ",
            {
              userId: req.session.userId,
              profileToView: req.params.username
            })
              .then(results => {
                return results.records;
              })
          };
          var match = findConnectionMatch(session);
          match.then(function(result) {
            
            console.log("This is the result to view the profile", result[0].get(0));
            if (result.length == 0){
              res.render("/contacts/")
            } else{
              user = result[0].get(0);
              res.render("profile", {name: user.properties.name, title: user.properties.title, phonenumber: user.properties.phonenumber, email: user.properties.email, location: user.properties.location, username: user.properties.username, bio: user.properties.bio, profilepic: user.properties.profilepic, resume: user.properties.resume});
            }
         });
        } catch(err) {
          return next(err);
        }
        
      }

      module.exports = exports;