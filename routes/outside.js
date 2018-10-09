var answer = require('../middlewares/generic/common').answer;
var register = require('../middlewares/users/register');
var login = require('../middlewares/users/login');
var logout = require('../middlewares/users/logout');

var userModel = require('../models/userModel');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    // * Login page
    app.post('/api/login',
        login(objectRepository),
        answer("POST /api/login")
    );

    // * Logout
    app.get('/api/logout',
        logout(objectRepository),
        // function(req, res, next){
        //     res.redirect('/');
        // }
        answer("GET /api/logout")
    );

    // * Registration
    app.post('/api/register',
        register(objectRepository),
        answer("POST /api/register")
    );

};
