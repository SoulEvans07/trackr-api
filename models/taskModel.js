const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const StateEnum = require('./stateEnum');

const TaskSchema = new Schema({
    name: String,
    description: String,
    assignee: { type: ObjectId, ref: 'User' },
    project: { type: ObjectId, ref: 'Project' },
    due_date: Date,
    comments: { type: ObjectId, ref: 'Comment' },

    state: StateEnum

    // TODO: attatchments: File[]
});


// because of this: https://github.com/Automattic/mongoose/issues/3056
// and this: https://github.com/Automattic/mongoose/issues/5289
TaskSchema.add({
    subtasks: [ { type: Schema.Types.ObjectId, ref: 'Task' } ]
});

module.exports = mongoose.model('Task', TaskSchema);
