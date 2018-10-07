var userModel = require('../models/userModel');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    app.get('/tasks',
        function (req, res, next) {
            return res.send("GET /tasks");
        }
    );

    app.get('/task/:uid',
        function (req, res, next) {
            return res.send("GET /task/" + req.params.uid);
        }
    );

    app.post('/task/new',
        function (req, res, next) {
            return res.send("POST /task/new<br>"+ JSON.stringify(req.body));
        }
    );

    app.post('/task/:uid/update',
        function (req, res, next) {
            return res.send("POST /task/" + req.params.uid + "/update<br>"+ JSON.stringify(req.body));
        }
    );

    app.post('/task/:uid/delete',
        function (req, res, next) {
            return res.send("POST /task/" + req.params.uid + "/delete");
        }
    );

};
