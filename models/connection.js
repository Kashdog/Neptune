const mongoose = require("mongoose"),
      validate = require("validator"),
      plm      = require("passport-local-mongoose"),
      db       = require("./index");

const connectionSchema = new mongoose.Schema({
sender: {
    type: String,
    required: [true, "A sender is required."]
},
receiver: {
    type: String,
    required: [true, "A receiver is required."]
},
pending: {
    type: Boolean,
    required: [true, "A pending status is required."]
}
}); 

const Connection = mongoose.model("Connection", connectionSchema);
module.exports = Connection;