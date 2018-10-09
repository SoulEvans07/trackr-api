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
    app.post('/login',
        login(objectRepository),
        answer("POST /login")
    );

    // * Logout
    app.get('/logout',
        logout(objectRepository),
        // function(req, res, next){
        //     res.redirect('/');
        // }
        answer("GET /logout")
    );

    // * Registration
    app.post('/register',
        register(objectRepository),
        answer("POST /register")
    );

};
