var requireOption = require('../generic/common').requireOption;
var mongoose = require('mongoose');

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        if(req.body.email === undefined)
            return res.status(400).send("Missing email address!");

        // * query user by email
        userModel.findOne({ email: req.body.email }).exec(function (err, user) {
            // * check for errors or empty result
            if (err) {
                res.tpl.error.push(JSON.stringify(err));
                return next();
            }

            // * put user on res.tpl
            res.tpl.user = user;

            return next();
        });
    };

};
