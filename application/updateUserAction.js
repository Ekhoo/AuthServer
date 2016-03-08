var crypto = require('crypto');
var User = require('../domain/model/User');

var updateUserAction = function updateUserAction(request, response) {
    var payload = {};

    User.findById(request.params.id, function(error, user) {
        if (error) {
            payload = {"error": true, "message": "Error getting user"}
        } else {
            if (request.body.email !== undefined) {
                user.email = request.body.email;
            }

            if (request.body.password !== undefined) {
                user.password = crypto.createHash("sha1").update(request.body.password).digest("base64");
            }

            user.save(function (error, data) {
                if (error) {
                    payload = {"error" : true,"message" : "Error updating data"};
                } else {
                    payload = {"error" : false,"message" : data};
                }

                response.json(payload);
            });
        }
    });
};

module.exports = updateUserAction;
