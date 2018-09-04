const neo4j = require('neo4j-driver').v1
      var uuid = require('node-uuid');
      var randomstring = require("randomstring");
      var dbUtils = require('../neo4j/dbUtils');
      var User = require('../models/neo4j/user');
      var _ = require('lodash');
      var crypto = require('crypto');
      var Facebook = require('facebook-node-sdk');


      var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic("neo4j", 'kunju123'));
      var session = driver.session();

exports.signup = async (req, res, next) => {
  try{
    res.render('signup', {
      message: "",
      email: "",
      username: "",
      linkedIn: "",
      phone: ""
    });
  } catch(err) {
    return next(err);
  }
}

exports.create = async(req, res, next) => {
  try{
    var register = function (session, username, password, phone, email) {
    return session.run('MATCH (user:User {username: {username}, {password: {password}}}) RETURN user', {username: username, password: password})
      .then(results => {
        if (!_.isEmpty(results.records)) {
          res.render('signup', {
            message: 'User already exists or Incorrect Username or Password',
            email,
            username,
            linkedIn: "",
            phone         
          })
        }
        else {
          return session.run('CREATE (user:User {id: {id}, username: {username}, password: {password}, phonenumber: {phonenumber},email: {email}, api_key: {api_key}}) RETURN user',
            {
              id: uuid.v4(),
              username: username,
              password: hashPassword(username, password),
              phonenumber: phone,
              email: email,
              api_key: randomstring.generate({
                length: 20,
                charset: 'hex'
              })
            }
          ).then(results => {
              
              return results.records[0].get('user');
            }
          )
        }
      })
  };

  var signup = register(session, req.body.username, req.body.password, req.body.phone, req.body.email);
  console.log(signup);
  await signup.then(function(result) {
    req.session.userId = result.properties.id;
 })
  res.redirect("/user/edit");
  } catch(err){
    return next(err);
  }
}

exports.login = async (req, res, next) => {
  try{
    res.render('signin', {
      message: "",
      email: "",
      username: "",
      linkedIn: "",
      phone: ""
    });
  } catch(err) {
    return next(err);
  }
}

exports.authenticate = async (req, res, next) => {
  try{
    var getCurrentUser = function (session) {
      return session.run("MATCH (n:User{username: {userName}}) RETURN n",
      {
        userName: req.body.username,
      })
        .then(results => {
          return results.records;
        })
    };
    var currentUser = getCurrentUser(session);
    await currentUser.then(function(result) {
      console.log(result.length);
      if(result.length == 0){
        res.render('signin', {
          message: "",
          email: "",
          username: "",
          linkedIn: "",
          phone: ""
        });
      }
      console.log("Chewbacca");
      console.log(result[0].get(0).properties.username);
      req.session.userId = result[0].get(0).properties.id
      res.redirect("/user");
   })
    res.send("How did you get here?");
  } catch (err) {
    return next(err);
  }
}

exports.logout = async (req, res, next) => {
  try{
    console.log("logout");
    req.session.userId = "";
    res.redirect("/auth/login");
  } catch(err) {
    return next(err);
  }
}

exports.facebook = async (req, res, next) => {
  try{
    console.log("facebook");
    var request = require("request");
    const userFieldSet = 'name, email';

var options = {
    method: 'GET',
    url: 'https://graph.facebook.com/me/',
    qs: {
        access_token: 'EAAN0PoV6YZC0BAJs3BgiNt2CvToghNp2rb8gsRa570SgYZBxt2sqIfsvQXEWUZArkqanZAJLaiWTFUd1aVPd8mZA8CZCEEepCgVB91ZBd3wBwOyoBePZBmEeZAF18Mh13uu3TVyuy3FDsbKVnJsorZAbZAaSVVZBZB3mchpa0SXmi87B6V46ZB0QBRksJ2Pyr8O5DNFusZD',
        fields: userFieldSet
    },
    fields: {
    
    },
    headers: {
        'content-type': 'application/json'
    }
};

var email;
var name;

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    email = JSON.parse(body)['email'];
    name = JSON.parse(body)['name'];
    console.log(JSON.parse(body)['name']);
});

var register = function (session, name, email) {
  return session.run('MATCH (user:User {email: {email}}) RETURN user', {email: email})
    .then(results => {
      if (!_.isEmpty(results.records)) {
        console.log("hello");
        return "User already exists";
      }
      else {
        return session.run('CREATE (user:User {id: {id}, name: {name},email: {email}, api_key: {api_key}}) RETURN user',
          {
            id: uuid.v4(),
            name: name,
            email: email,
            api_key: randomstring.generate({
              length: 20,
              charset: 'hex'
            })
          }
        ).then(results => {
            
            return results.records[0].get('user');
          }
        )
      }
    })
};
var signup = register(session, name, email);
signup.then(function(result) {
    console.log("this is the result", result);
    if(result == "User already exists"){
      res.redirect("/auth/user");
    }
    req.session.userId = result.properties.id;
});
res.redirect("/user/edit");

  } catch(err) {
    return next(err);
  }
}

function hashPassword(username, password) {
  var s = username + ':' + password;
  return crypto.createHash('sha256').update(s).digest('hex');
}