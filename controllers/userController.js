const entities = require('html-entities').AllHtmlEntities;
const User = require('../models/userModel');

exports.list = async function (req, res, next) {
    let users = await User.find().exec();

    return res.status(200).send(users);
};

exports.get = async function (req, res, next) {
    let user = await User.findById(req.params.id).exec();

    if (!user) {
        return res.status(400).send('No user with id: ' + req.params.id);
    }

    return res.status(200).send(user);
};

exports.update = async function (req, res, next) {
    let user = await User.findById(req.params.id).exec();

    if (!user) {
        return res.status(400).send('No user with id: ' + req.params.id);
    }

    // TODO: sanity checks
    // TODO: all attribute
    user.name = req.body.name;

    user = await user.save();

    return res.status(200).send(user);
};

exports.delete = async function (req, res, next) {
    let user = await User.findById(req.params.id).exec();

    if (!user) {
        return res.status(400).send('No user with id: ' + req.params.id);
    }

    await user.delete();

    return res.status(200).send();
};