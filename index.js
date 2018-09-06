const PORT       = process.env.PORT || 8081;
const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      passport   = require('passport'),
      session    = require('express-session'),
      localStrat = require('passport-local'),
      FacebookStrategy = require('passport-facebook').Strategy;

      const neo4j = require('neo4j-driver').v1;
      var uuid = require('node-uuid');
      var randomstring = require("randomstring");
      var _ = require('lodash');
      var crypto = require('crypto');

      

// App settings.
app.use(session({
  path: "/",
  secret: "feanarocurufinweartanaroereinioingilgalad",
  resave: false,
  saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());


// set view engine to ejs
app.set('view engine', 'ejs')

// use static files from public folder
app.use(express.static(__dirname + '/public'))

//  ***** All routes will go here. *****
app.use('/menu', require('./routes/menu'));
app.use('/user', require('./routes/user'));
app.use('/auth', require('./routes/auth'));
app.use('/contacts', require('./routes/contacts'))
app.use('/viewprofile', require('./routes/viewprofile'));
app.use('/viewuniversity', require('./routes/viewuniversity'));

// create route for '/' and render the 'index.ejs' file to the browser
app.get('/', (req, res, next) => {
  res.render('index')
});

// Database
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic("neo4j", 'kunju123'));
var neo4jsession = driver.session();
// ***** File Uploads *****

var jqupload = require('jquery-file-upload-middleware');


app.use('/upload', function(req, res, next){
    var getCurrentUser = function (session) {
      return session.run("MATCH (n:User{id: {userId}}) RETURN n",
      {
        userId: req.session.userId,
      })
        .then(results => {
          return results.records[0].get(0);
        })
    };
    var currentUser = getCurrentUser(neo4jsession);
    currentUser.then(function(result) {
      console.log(result.properties.username);
      jqupload.fileHandler({
        uploadDir: function(){
            return __dirname + '/public/uploads/' + result.properties.username;
        },
        uploadUrl: function(){
            return '/uploads/' + result.properties.username;
        },
    })(req, res, next);
    })
});

// 404 Error Generator
app.use((req, res, next) => {
  let err = new Error('Oops! Page could not be located.');
  err.status = 404;
  next(err);
})

// Error Handler
app.use(require('./handlers/errors'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
})