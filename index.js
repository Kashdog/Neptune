const PORT       = 8081;
const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser");

// App settings.
app.use(bodyParser.json())

// set view engine to ejs
app.set('view engine', 'ejs')

// use static files from public folder
app.use(express.static(__dirname + '/public'))

//  ***** All routes will go here. *****

// create route for '/' and render the 'index.ejs' file to the browser
app.get('/', function(req, res) {
  res.render('index')
})

app.use("/api/auth", require("./routes/auth"));


// 404 Error Generator
app.use((req, res, next) => {
  let err = new Error("Oops! Endpoint could not be located.");
  err.status = 404;
  next(err);
})

// Error Handler
app.use(require("./handlers/errors"));

app.listen(PORT, () => {
  console.log(`API Server listening on port ${PORT}.`);
})