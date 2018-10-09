var answer = require('../middlewares/generic/common').answer;

var getUserList = require('../middlewares/users/getUserList');
var getUser = require('../middlewares/users/getUser');
var searchUser = require('../middlewares/users/searchUser');

var userModel = require('../models/userModel');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    app.post('/api/user/:uid/update',
        answer('POST /api/user/:uid/update')
    );

    app.post('/api/user/:uid/delete',
        answer('POST /api/user/:uid/delete')
    );

    app.get('/api/user/:uid',
        getUser(objectRepository),
        answer('GET /api/user/:uid')
    );

    app.post('/api/user/search',
        searchUser(objectRepository),
        answer('POST /api/user/search')
    );

    app.get('/api/users',
        getUserList(objectRepository),
        answer('GET /api/users')
    );
};
