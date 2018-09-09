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
app.use('/qrconnect', require('./routes/qrconnect'))
app.use('/viz', require('./routes/viz'));

// create route for '/' and render the 'index.ejs' file to the browser
app.get('/', (req, res, next) => {
  res.render('index')
});

// Database
var driver = neo4j.driver('bolt://35.233.191.222:7687', neo4j.auth.basic("neo4j", 'bPCs40260$#'));
var neo4jsession = driver.session();


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