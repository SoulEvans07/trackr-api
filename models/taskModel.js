const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TaskSchema = new Schema({
    // TODO: make Task model
    name: String,
    is_done: Boolean
});

module.exports = mongoose.model('Task', TaskSchema);
