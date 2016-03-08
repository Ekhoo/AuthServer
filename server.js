var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
var User = require("./domain/model/User");
var mongoose = require("mongoose");
var config = require('./config');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var createUserAction = require('./application/createUserAction');
var getUserAction = require('./application/getUserAction');
var updateUserAction = require('./application/updateUserAction');
var deleteUserAction = require('./application/deleteUserAction');

mongoose.connect(config.database);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : true}));
app.use(morgan('dev'));

router.route("/user/register").post(createUserAction);

router.use(function (request, response, next) {
    var token = request.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secret, function (error, decoded) {
            if (error) {
                response.json({
                    error: true,
                    message: 'Token validation failed'
                });
            } else {
                request.decoded = decoded;
                next();
            }
        });
    } else {
        response.status(403);
        response.json({
            error: true,
            message: 'No token provided.'
        });
    }
});

router.route("/user/:id")
    .get(getUserAction)
    .put(updateUserAction)
    .delete(deleteUserAction);

app.use("/api", router);

var port = process.env.PORT || config.port;
app.listen(port);
console.log("Server listen on port " + port);
