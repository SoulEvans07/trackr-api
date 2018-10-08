var requireOption = require('../generic/common').requireOption;
var mongoose = require('mongoose');

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        var id;
        // * validate id in url
        try {
            id = new mongoose.Types.ObjectId(req.params.uid);
        } catch (e){
            res.tpl.error.push('invalid user id: ' + req.params.uid);
            res.tpl.error.push('(' + e.message + ')');
            return next();
        }

        // * query user by id
        userModel.findOne({ _id: id }).exec(function (err, user) {
            // * check for errors or empty result
            if (err) {
                res.tpl.error.push(JSON.stringify(err));
                return next();
            }
            if (!user) {
                res.tpl.error.push('no user on id: ' + JSON.stringify(id));
                return next();
            }

            // * put user on res.tpl
            res.tpl.user = user;

            return next();
        });
    };

};
