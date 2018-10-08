var answer = require('../middlewares/generic/common').answer;

var getUserList = require('../middlewares/users/getUserList');
var getUser = require('../middlewares/users/getUser');
var searchUser = require('../middlewares/users/searchUser');

var userModel = require('../models/userModel');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    app.post('/user/:uid/update',
        answer('POST /user/:uid/update')
    );

    app.post('/user/:uid/delete',
        answer('POST /user/:uid/delete')
    );

    app.get('/user/:uid',
        getUser(objectRepository),
        answer('GET /user/:uid')
    );

    app.post('/user/search',
        searchUser(objectRepository),
        answer('POST /user/search')
    );

    app.get('/users',
        getUserList(objectRepository),
        answer('GET /users')
    );
};
