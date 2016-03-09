var User = require('../domain/model/User');

var getUserAction = function getUserAction(request, response) {
    var payload = {};

    User.findById(request.params.id, function (error, user) {
        if (error) {
            payload = {
                message: "Error getting user"
            };
        } else {
            payload = {
                message: user
            };
        }

        response.json(payload);
    });
};

module.exports = getUserAction;
