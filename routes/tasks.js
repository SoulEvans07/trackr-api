var userModel = require('../models/userModel');
var answer = require('../middlewares/generic/common').answer;

module.exports = function(app) {

    var objectRepository = {
        userModel: userModel
    };

    app.get('/api/tasks',
        answer("GET /api/tasks")
    );

    app.get('/api/task/:uid',
        answer("GET /api/task/:uid")
    );

    app.post('/api/task/new',
        answer("POST /api/task/new")
    );

    app.post('/api/task/:uid/update',
        answer("POST /task/:uid/update")
    );

    app.post('/api/task/:uid/delete',
        answer("POST /task/:uid/delete")
    );

};
