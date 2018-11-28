const entities = require('html-entities').AllHtmlEntities;
const Task = require('../models/taskModel');

exports.list = async function (req, res, next) {
    let tasks = await Task.find({ assigner: res.currentUser }).exec();

    return res.status(200).send(tasks);
};

exports.new = async function (req, res, next) {
    let task = new Task({
        index: req.body.index,
        name: entities.encode(req.body.name),
        assigner: res.currentUser
    });

    console.log("new on " + task.index);
    await updateIndicies(task.index, 1);
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
    // task.index = req.body.index;
    task.name = entities.encode(req.body.name);
    task.is_done = req.body.is_done;

    task = await task.save();

    return res.status(200).send(task);
};

exports.delete = async function (req, res, next) {
    let task = await Task.findById(req.params.id).exec();

    if (!task) {
        return res.status(400).send('No task with id: ' + req.params.id);
    }

    console.log("delete " + task.index);
    await task.delete();
    await updateIndicies(task.index, -1);

    return res.status(200).send();
};


const updateIndicies = async function (start, mov) {
    let target = await Task.find({ index: { $gte: start } }).exec();
    target.asyncForEach(async task => {
        console.log("moved: " + task.index + " " + (task.index+mov));
        task.index += mov;
        await task.save();
    })
};