var requireOption = require('../generic/common').requireOption;

module.exports = function (objectRepository) {

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {
        userModel.find({}).exec(function (err, results) {
            if(err){
                return next(new Error('Cannot find users!'));
            }

            res.tpl.users = results.sort(compareUsers);
            return next();
        });
    };

    function compareUsers(a, b) {
        if (a.username.toLowerCase() < b.username.toLowerCase())
            return -1;
        if (a.username.toLowerCase() > b.username.toLowerCase())
            return 1;
        return 0;
    }

};
