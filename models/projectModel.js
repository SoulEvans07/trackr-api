const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var ProjectSchema = new Schema({
    // TODO: make Project model
    name: String,
    tasks: { type: ObjectId, ref: 'Task' }
});

module.exports = mongoose.model('Project', ProjectSchema);
