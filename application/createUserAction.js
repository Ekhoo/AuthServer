var crypto = require('crypto');
var User = require('../domain/model/User');
var config = require('../config.js');
var jwt = require('jsonwebtoken');

var createUserAction = function createUserAction(request, response) {
    var payload = {};

    User.findOne({email: request.body.email}, function (error, user) {
        if (user) {
            payload = {
                message: "Registration failed, user already exist.",
                error: true
            };

            response.status(409);
            response.json(payload);
        } else {
            var newUser = new User();
            newUser.email = request.body.email;
            newUser.password = crypto.createHash("sha1").update(request.body.password).digest("base64");
            newUser.token = jwt.sign(newUser, config.secret, {
                expiresInMinutes: 1440 // Expires in 24 hours
            });

            newUser.save(function (error, data) {
                if (error) {
                    payload = {
                        error: true,
                        message: "Error when creating the user."
                    };
                } else {
                    payload = {
                        error: false,
                        message: data
                    };
                }

                response.json(payload);
            });
        }
    });
};

module.exports = createUserAction;
