var errorHandler = require('../middlewares/generic/common').errorHandler;
var answer = require('../middlewares/generic/common').answer;

var getUserList = require('../middlewares/users/getUserList');
var getUser = require('../middlewares/users/getUser');

var userModel = require('../models/userModel');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    app.post('/user/:uid/update',
        errorHandler(),
        answer("POST /user/:uid/update")
    );

    app.post('/user/:uid/delete',
        errorHandler(),
        answer("POST /user/:uid/delete")
    );

    app.get('/user/:uid',
        getUser(objectRepository),
        errorHandler(),
        answer("GET /user/:uid")
    );

    app.get('/users',
        getUserList(objectRepository),
        errorHandler(),
        answer("GET /users")
    );
};
