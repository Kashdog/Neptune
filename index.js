const PORT       = 8081;
const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      passport   = require('passport'),
      session    = require('express-session'),
      localStrat = require('passport-local'),
      db         = require("./models"),
      authMW     = require("./middleware/auth");

// App settings.
app.use(session({
  secret: "russelWANTEDdekANDaneeshWANTEDjanusWHOwillWIN?weDONTknow!",
  resave: false,
  saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrat(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());


// set view engine to ejs
app.set('view engine', 'ejs')

// use static files from public folder
app.use(express.static(__dirname + '/public'))

//  ***** All routes will go here. *****

app.use('/user', authMW.isValidated, require('./routes/user'));
app.use('/auth', require('./routes/auth'));

// create route for '/' and render the 'index.ejs' file to the browser
app.get('/', (req, res, next) => {
  res.render('index')
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