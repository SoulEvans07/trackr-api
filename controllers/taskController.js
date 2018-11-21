const entities = require('html-entities').AllHtmlEntities;
const Task = require('../models/taskModel');

exports.list = async function (req, res, next) {
    let tasks = await Task.find({assigner: res.currentUser}).exec();

    return res.status(200).send(tasks);
};

exports.new = async function (req, res, next) {
    let task = new Task({
        name: entities.encode(req.body.name),
        assigner: res.currentUser
    });

    task = await task.save();

    return res.status(200).send(task);
};

exports.get = async function (req, res, next) {
    let task = await Task.findById(req.params.id).exec();

    if (!task) {
        return res.status(400).send('No task with id: ' + req.params.id);
    }

    return res.status(200).send(task);
};

exports.update = async function (req, res, next) {
    let task = await Task.findById(req.params.id).exec();

    if (!task) {
        return res.status(400).send('No task with id: ' + req.params.id);
    }

    // TODO: sanity checks
    // TODO: all attribute
    task.name = req.body.name;
    task.state = req.body.state;

    task = await task.save();

    return res.status(200).send(task);
};

exports.delete = async function (req, res, next) {
    let task = await Task.findById(req.params.id).exec();

    if (!task) {
        return res.status(400).send('No task with id: ' + req.params.id);
    }

    await task.delete();

    return res.status(200).send();
};