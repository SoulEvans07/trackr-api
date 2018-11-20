const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const CommentSchema = new Schema({
    author: { type: ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    text: String
});

module.exports = mongoose.model('Comment', CommentSchema);
