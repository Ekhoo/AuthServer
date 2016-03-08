var User = require('../domain/model/User');

var deleteUserAction = function deleteUserAction(request, response) {
    var payload = {};

    User.findById(request.params.id, function(error, user) {
        if (error) {
            payload = {"error": true, "message": "Error getting user"}
        } else {
            user.remove(function (error) {
                if (error) {
                    payload = {"error" : true,"message" : "Error deleting data"};
                } else {
                    payload = {"error" : true,"message" : "Data associated with " + request.params.id + "is deleted"};
                }

                response.json(payload);
            });
        }
    });
};

module.exports = deleteUserAction;
