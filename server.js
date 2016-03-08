var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
var User = require("./domain/model/User");
var mongoose = require("mongoose");
var config = require('./config');
var morgan = require('morgan');
var createUserAction = require('./application/createUserAction');
var getUserAction = require('./application/getUserAction');
var updateUserAction = require('./application/updateUserAction');
var deleteUserAction = require('./application/deleteUserAction');

mongoose.connect(config.database);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : true}));
app.use(morgan('dev'));

/*** User ***/
router.route("/user").post(createUserAction);
router.route("/user/:id")
    .get(getUserAction)
    .put(updateUserAction)
    .delete(deleteUserAction);

app.use("/api", router);

app.listen(config.port);
console.log("Server listen on port " + config.port);
