const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProjectSchema = new Schema({
    name: String,
    owner: { type: ObjectId, ref: 'User' },
    team: { type: ObjectId, ref: 'Team' },
    tasks: { type: ObjectId, ref: 'Task' }
});

module.exports = mongoose.model('Project', ProjectSchema);
