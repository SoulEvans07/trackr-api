var errorHandler = require('../middlewares/generic/common').errorHandler;
var answer = require('../middlewares/generic/common').answer;
var register = require('../middlewares/users/register');

var userModel = require('../models/userModel');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    /**
     * Registration
     */
    app.post('/register',
        register(objectRepository),
        errorHandler(),
        answer("POST /register")
    );

};
