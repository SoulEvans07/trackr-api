var requireOption = require('../generic/common').requireOption;
var entities = require('html-entities').AllHtmlEntities;
var bcrypt = require('bcrypt-nodejs');

/**
 * Check if the email address is already registered, if not
 * create the user (no extra checks on password)
 */
module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');
    var SALT_WORK_FACTOR = 10;

    return function (req, res, next) {
        // * Not enough parameter
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        // * Find the User by email
        userModel.findOne({
            email: req.body.email
        }, function (err, user) {
            if ((err) || (user !== null)) {
                var newErr = new Error('Your email address is already registered!');
                newErr.stack += '\nCaused by: ' + err.stack;
                return next(newErr);
            }

            // * Find the User by username
            userModel.findOne({
                username: req.body.username
            }, function (err, user) {
                if ((err) || (user !== null)) {
                    var newErr = new Error('Username is taken!');
                    newErr.stack += '\nCaused by: ' + err.stack;
                    return next(newErr);
                }

                if (req.body.username.length < 3) {
                    return next(new Error('The username should be at least 3 characters!'));
                }

                // * Create User
                var newUser = new userModel();
                newUser.username = entities.encode(req.body.username);
                newUser.email = entities.encode(req.body.email);

                // * Password Hashing
                bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                    if(err){
                        var newErr = new Error('Failed at salt generation!');
                        newErr.stack += '\nCaused by: ' + err.stack;
                        return next(newErr);
                    }
                    bcrypt.hash(req.body.password, salt, null, function(err, hash) {
                        if(err){
                            var newErr = new Error('Failed at password hash generation!');
                            newErr.stack += '\nCaused by: ' + err.stack;
                            return next(newErr);
                        }

                        newUser.pwdhash = hash;
                        newUser.save(function (err) {
                            return next();
                        });
                    });
                });
            });
        });
    };
};
