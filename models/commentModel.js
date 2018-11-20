const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const CommentSchema = new Schema({
    author: { type: ObjectId, ref: 'User' },
    text: String,
    date: { type: Date, default: Date.now },
    modified: Boolean
});

module.exports = mongoose.model('Comment', CommentSchema);
