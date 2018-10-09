var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Task = db.model('Task', {
    // TODO: make Task model
});

module.exports = Task;
