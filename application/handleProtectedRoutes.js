var jwt = require('jsonwebtoken');
var User = require('../domain/model/User');
var config = require('../config');

var handleProtectedRoutes = function handleProtectedRoutes(request, response, next) {
    var token = request.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secret, function (error, decoded) {
            if (error) {
                response.status(401);
                response.json({
                    message: error.message
                });
            } else {
                request.decoded = decoded;

                User.findOne({token: token}, function (error, user) {
                    if (error || !user) {
                        response.status(401);
                        response.json({
                            message: 'Cannot find user with this token.'
                        });
                    } else {
                        next();
                    }
                });
            }
        });
    } else {
        response.status(401);
        response.json({
            message: 'No token provided.'
        });
    }
};

module.exports = handleProtectedRoutes;
