const neo4j = require('neo4j-driver').v1;
      var uuid = require('node-uuid');
      var randomstring = require("randomstring");
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
          var qrConnect = function (session) {
            return session.run("MATCH (a:User { username: {username} }), (b:User { id: {id} } ) CREATE (a)<-[r:invites]-(b) RETURN type(r)",
            {
              username: req.params.username,
              id: req.session.userId
            })
              .then(results => {
                return results.records;
              })
          };
          var match = qrConnect(session);
          match.then(function(result) {
            
            console.log("A Connection was created", result[0].get(0));
            if (result.length == 0){
              res.redirect("/contacts/")
            } else{
                res.redirect("/contacts/connections/")  
            }
         });
        } catch(err) {
          return next(err);
        }
        
      }

      module.exports = exports;