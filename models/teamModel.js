const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const TeamSchema = new Schema({
    name: String,
    leader: { type: ObjectId, ref: 'User' },
    members: [ { type: ObjectId, ref: 'User' } ],
    // TODO: visibility
});

module.exports = mongoose.model('Team', TeamSchema);
