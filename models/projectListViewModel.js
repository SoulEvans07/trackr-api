const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ProjectListViewSchema = new Schema({
    user: { type: ObjectId, ref: 'User' },
    list: [
        { type: ObjectId, ref: 'Task' }
    ]
});

module.exports = mongoose.model('ProjectListView', ProjectListViewSchema);
