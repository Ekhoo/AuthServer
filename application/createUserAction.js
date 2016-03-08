var crypto = require('crypto');
var User = require('../domain/model/User');

var createUserAction = function createUserAction(request, response) {
    var user = new User();
    var payload = {};

    user.email = request.body.email;
    user.password = crypto.createHash("sha1").update(request.body.password).digest("base64")

    user.save(function (error, data) {
        if (error) {
            payload = {"error": true, "message": "Error adding user"};
        } else {
            payload = {"error": false, "message" : data};
        }

        response.json(payload);
    });
};

module.exports = createUserAction;
