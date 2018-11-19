const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const bcrypt = require('bcrypt');


const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    signupdate: { type: Date, default: Date.now }
});

UserSchema.pre('save', function (next) {
    const SALT_FACTOR = 10;
    const user = this;
    if (user.isNew) {
        if (user.password) {
            bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
                if (err) {
                    console.error('Error saving user', user.email, err);
                    return next();
                }
                user.password = hash;
                return next();
            });
        } else {
            return next();
        }
    } else {
        return next();
    }
});

module.exports = mongoose.model('User', UserSchema);
