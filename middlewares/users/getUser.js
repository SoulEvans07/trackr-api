var requireOption = require('../generic/common').requireOption;
var mongoose = require('mongoose');

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        var id;
        // * validate id in url
        try {
            id = new mongoose.Types.ObjectId(req.params.uid);
        } catch (err){
            var newErr = new Error('Invalid user id: ' + req.params.uid + ' (Caused by: ' + err.message + ')');
            return next(newErr);
        }

        // * query user by id
        userModel.findOne({ _id: id }).exec(function (err, user) {
            // * check for errors or empty result
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new Error('No user on id: ' + JSON.stringify(id)));
            }

            // * put user on res.tpl
            res.tpl.user = user;

            return next();
        });
    };

};
