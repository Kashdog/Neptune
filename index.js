const PORT       = 8081;
const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      passport   = require('passport'),
      session    = require('express-session'),
      localStrat = require('passport-local'),
      db         = require("./models"),
      authMW     = require("./middleware/auth"),
      FacebookStrategy = require('passport-facebook').Strategy;

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

passport.use(new FacebookStrategy({
  clientID: '972236806317053',
  clientSecret: '81601ccaa600a06af0bd176443490473',
  callbackURL: "/auth/facebook/callback",
  profileURL: 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
  profileFields   : ['id', 'email', 'name'],
  passReqToCallback : true
  
},
function(req, token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function() {

        // check if the user is already logged in
        if (!req.user) {

            db.User.findOne({ 'email' : (profile.emails[0].value || '').toLowerCase()}, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if there is a user id already but no token (user was linked at one point and then removed)
                    if (!user.facebook.token) {
                      
                        user.facebook.token = token;
                        user.email = (profile.emails[0].value || '').toLowerCase();

                        user.save(function(err) {
                            if (err){
                              console.log("tolkien save error");
                              return done(err);
                            }
                                
                            return done(null, user);
                        });
                    }

                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    var newUser            = new db.User();

                    newUser.facebook.id    = profile.id;
                    newUser.facebook.token = token;
                    newUser.email = (profile.emails[0].value || '').toLowerCase();

                    newUser.save(function(err) {
                        if (err)
                            return done(err);
                            
                        return done(null, newUser);
                    });
                }
            });

        } else {
            // user already exists and is logged in, we have to link accounts
            var user            = req.user; // pull the user out of the session

            user.facebook.id    = profile.id;
            user.facebook.token = token;
            user.email = (profile.emails[0].value || '').toLowerCase();

            user.save(function(err) {
                if (err)
                    return done(err);
                    
                return done(null, user);
            });

        }
    });

}));


// set view engine to ejs
app.set('view engine', 'ejs')

// use static files from public folder
app.use(express.static(__dirname + '/public'))

//  ***** All routes will go here. *****

app.use('/user', authMW.isValidated, require('./routes/user'));
app.use('/auth', require('./routes/auth'));
app.use('/contacts', authMW.isValidated, require('./routes/contacts'))

// create route for '/' and render the 'index.ejs' file to the browser
app.get('/', (req, res, next) => {
  res.render('index')
});

// ***** File Uploads *****

var jqupload = require('jquery-file-upload-middleware');

app.use('/upload', function(req, res, next){
    jqupload.fileHandler({
        uploadDir: function(){
            return __dirname + '/public/uploads/' + req.user.username;
        },
        uploadUrl: function(){
            return '/uploads/' + req.user.username;
        },
    })(req, res, next);
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