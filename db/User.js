var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/dataBase");

var mongoSchema = mongoose.Schema;
var userSchema = {
  "email": String,
  "password": String
}

module.exports = mongoose.model("User", userSchema);
