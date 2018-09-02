const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost:27017/shuffled", {
  useNewUrlParser: true 
});

module.exports.User = require("./user");
module.exports.Connection = require("./connection");