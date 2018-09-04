const neo4j = require('neo4j-driver').v1;
      var uuid = require('node-uuid');
      var randomstring = require("randomstring");
      var dbUtils = require('../neo4j/dbUtils');
      var User = require('../models/neo4j/user');
      var _ = require('lodash');
      var crypto = require('crypto');

      var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic("neo4j", 'kunju123'));
      var session = driver.session();

exports.index = async (req, res, next) => {
    try {
        if(!req.session.userId || req.session.userId == ""){
            console.log("true");
            res.redirect("/auth/login");
        } else{
            var getOtherUsers = function (session) {
                return session.run("MATCH (a:User), (b:User {id: {userId}}) WHERE NOT (a)-[:connectedTo]->(b:User {id: {userId}}) AND a.id  <> {userId} AND NOT (b)-[:invites]->(a) RETURN a",
                {
                  userId: req.session.userId,
                })
                  .then(results => {
                    return results.records;
                  })
              };
              var users = getOtherUsers(session);
              users.then(function(result) {
                var allOtherUsers = [];
                for(var i = 0; i < result.length; i++){
                    allOtherUsers.push(result[i].get(0).properties);
                }
                console.log("all other Users voldy", allOtherUsers);
                res.render('contactlist.ejs', { "users": allOtherUsers });
             })
             
        }
    } catch(err) {
      return next(err);
    }
    
}

exports.invites = async (req, res, next) => {
    try {
        if(!req.session.userId || req.session.userId == ""){
            console.log("true");
            res.redirect("/auth/login");
        } else{
            console.log("this is the invites page");
            var getCurrentUser = function (session) {
                return session.run("MATCH (n:User{id: {userId}}) RETURN n",
                {
                    userId: req.session.userId,
                })
                .then(results => {
                return results.records[0].get(0);
                })
            };
            var getInvites = function (session, sender) {
                return session.run("MATCH (connection:User) -[r:invites]->(n { username: {senderUserName} })return connection",
                {
                senderUserName: sender
                })
                .then(results => {
                    return results.records;
                })
            };
            var currentUser = getCurrentUser(session);
            var allInvites = [];
            currentUser.then(function(result) {
                console.log("Current User", result.properties.username);
                var invites = getInvites(session, result.properties.username);
                invites.then(function(result) {
                    console.log("Invites Result", result)
                    for(var i = 0; i < result.length; i++){
                        allInvites.push(result[i].get(0).properties);
                    }
                    console.log("These are the allinvites", allInvites);
                    console.log("number of allinvites", allInvites.length);
                    res.render('invites.ejs', { "users": allInvites });
                });
            });  
        }
    } catch(err) {
      return next(err);
    }
    
}

exports.connections = async (req, res, next) => {
    try {
        if(!req.session.userId || req.session.userId == ""){
            console.log("true");
            res.redirect("/auth/login");
        } else{
            console.log("this is the invites page");
            var getCurrentUser = function (session) {
                return session.run("MATCH (n:User{id: {userId}}) RETURN n",
                {
                    userId: req.session.userId,
                })
                .then(results => {
                return results.records[0].get(0);
                })
            };
            var getConnections = function (session, sender) {
                return session.run("MATCH (connection:User) -[r:connectedTo]->(n { username: {senderUserName} })return connection",
                {
                senderUserName: sender
                })
                .then(results => {
                    return results.records;
                })
            };
            var currentUser = getCurrentUser(session);
            var allConnections = [];
            currentUser.then(function(result) {
                console.log("Current User", result.properties.username);
                var connections = getConnections(session, result.properties.username);
                connections.then(function(result) {
                    console.log("Invites Result", result)
                    for(var i = 0; i < result.length; i++){
                        allConnections.push(result[i].get(0).properties);
                    }
                    console.log("These are the allConnections", allConnections);
                    console.log("number of allConnectionss", allConnections.length);
                    res.render('connections.ejs', { "users": allConnections });
                });
            });  
        }
    } catch(err) {
      return next(err);
    }
    
}

exports.recommendations = async (req, res, next) => {
    try {
        if(!req.session.userId || req.session.userId == ""){
            console.log("true");
            res.redirect("/auth/login");
        } else{
            console.log("this is the recommendations page");
            var getCurrentUser = function (session) {
                return session.run("MATCH (n:User{id: {userId}}) RETURN n",
                {
                    userId: req.session.userId,
                })
                .then(results => {
                return results.records[0].get(0);
                })
            };
            var getRecommendations = function (session, sender) {
                return session.run("MATCH (connection:User) -[r:connectedTo*2]-> (n { username: {senderUserName} }) WHERE NOT((connection)-[:connectedTo]->(n)) AND connection.username <> {senderUserName} RETURN connection",
                {
                senderUserName: sender
                })
                .then(results => {
                    return results.records;
                })
            };
            var currentUser = getCurrentUser(session);
            var allRecommendations = [];
            currentUser.then(function(result) {
                console.log("Current User", result.properties.username);
                var recommendations = getRecommendations(session, result.properties.username);
                recommendations.then(function(result) {
                    console.log("Invites Result", result)
                    for(var i = 0; i < result.length; i++){
                        allRecommendations.push(result[i].get(0).properties);
                    }
                    console.log("These are the allConnections", allRecommendations);
                    console.log("number of allConnectionss", allRecommendations.length);
                    res.render('recommendedfriends.ejs', { "users": allRecommendations });
                });
            });  
        }
    } catch(err) {
      return next(err);
    }
    
}

exports.changeView = async (req, res, next) => {
    try{
        console.log("view", req.body.all);
        if (req.body.all == "all"){
            res.redirect("/contacts");
        } 
        else if(req.body.all == "incontacts"){
            res.redirect("/contacts/connections");
        }
        else if (req.body.all == "invites"){
            res.redirect("/contacts/invites");

        }
        else if(req.body.all == "recommendedfriends"){
            res.redirect("/contacts/recommendations");
        }
    } catch(err) {
        return next(err);
    }
}

exports.connect = async (req, res, next) => {
    try {
        var getCurrentUser = function (session) {
            return session.run("MATCH (n:User{id: {userId}}) RETURN n",
            {
                userId: req.session.userId,
            })
                .then(results => {
                return results.records[0].get(0);
                })
            };
        var createConnection = function (session, sender, receiver) {
            return session.run("MATCH (a:User{username: {senderUserName}}),(b:User{username: {receiverUserName}}) CREATE (a)-[r:invites]->(b) RETURN type(r)",
            {
            senderUserName: sender,
            receiverUserName: receiver
            })
            .then(results => {
                return results.records[0].get(0);
            })
        };
          var currentUser = getCurrentUser(session);
          currentUser.then(function(result) {
            console.log(result.properties.username);
            console.log(req.body.username);
            var connection = createConnection(session, result.properties.username, req.body.username);
            connection.then(function(result) {
                console.log(result);
                res.redirect("/contacts")
            });
         });
    } catch(err) {
        console.log(err);
        return next(err);
    }
}

exports.acceptinvite = async (req, res, next) => {
    try {
        var getCurrentUser = function (session) {
            return session.run("MATCH (n:User{id: {userId}}) RETURN n",
            {
                userId: req.session.userId,
            })
                .then(results => {
                return results.records[0].get(0);
                })
            };
        var acceptConnection = function (session, sender, receiver) {
            return session.run("MATCH (a:User { username: {senderUserName} })-[r]->(b:User { username: {receiverUserName}}) DELETE r CREATE (a)-[t:connectedTo]->(b) CREATE (b)-[s:connectedTo]->(a) RETURN type(s), type(t)",
            {
            senderUserName: sender,
            receiverUserName: receiver
            })
            .then(results => {
                return results.records[0].get(0);
            })
        };
          var currentUser = getCurrentUser(session);
          currentUser.then(function(result) {
            console.log("accept invite");
            console.log(result)
            var connection = acceptConnection(session, req.body.username, result.properties.username);
            connection.then(function(result) {
                console.log(result);
                res.redirect("/contacts")
            });
         });
    } catch(err) {
        console.log(err);
        return next(err);
    }
}