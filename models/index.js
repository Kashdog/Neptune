const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost:27017/janus", {
  useNewUrlParser: true 
});

module.exports.User = require("./user");