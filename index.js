const PORT       = 8081;
const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser");


// All routes will go here.
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