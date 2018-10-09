var requireOption = require('../generic/common').requireOption;
var bcrypt = require('bcrypt-nodejs');

/**
 * This middleware loads the user from model and checks the credentials,
 * if they are ok, set session values and redirect to /
 * if they are wrong, set error message
 */
module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {
        //not enough parameter
        if ((typeof req.body === 'undefined') || (typeof req.body.username === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next(new Error('Missing parameters!'));
        }

        //lets find the user
        userModel.findOne({
            username: req.body.username
        }, function (err, user) {
            if ((err) || (!user)) {
                var newErr = new Error('Your email address is not registered!');
                if(err)
                    newErr.stack += '\nCaused by: ' + err.stack;
                return next(newErr);
            }

            // * Check password
            bcrypt.compare(req.body.password, user.pwdhash, function (err, match) {
                if (err) {
                    var newErr = new Error('Error in password hash compare!');
                    if(err)
                        newErr.stack += '\nCaused by: ' + err.stack;
                    return next(newErr);
                }

                if(match){
                    // * Login is ok, save id to session
                    req.session.userid = user._id;
                    req.session.username =  user.username;
                    // * Redirect to / so the app can decide where to go next
                    return next();
                } else {
                    return next(new Error('Wrong password!'));
                }
            });
        });
    };

};
