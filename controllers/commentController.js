const entities = require('html-entities').AllHtmlEntities;
const Comment = require('../models/commentModel');

exports.list = async function (req, res, next) {
    // TODO: list only comments for the task
    let comments = await Comment.find().exec();

    return res.status(200).send(comments);
};

exports.new = async function (req, res, next) {
    let comment = new Comment({
        author: res.currentUser,
        text: entities.encode(req.body.text)
    });

    // TODO: set comment for the task
    comment = await comment.save();

    return res.status(200).send(comment);
};

exports.update = async function (req, res, next) {
    let comment = await Comment.findById(req.params.id).exec();

    if (!comment) {
        return res.status(400).send('No comment with id: ' + req.params.id);
    }

    // TODO: sanity checks
    // TODO: all attribute
    comment.name = req.body.name;

    comment = await comment.save();

    return res.status(200).send(comment);
};

exports.delete = async function (req, res, next) {
    let comment = await Comment.findById(req.params.id).exec();

    if (!comment) {
        return res.status(400).send('No comment with id: ' + req.params.id);
    }

    await comment.delete();

    return res.status(200).send();
};