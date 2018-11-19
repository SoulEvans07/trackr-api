const mongoose = require('mongoose');
const entities = require('html-entities').AllHtmlEntities;
const Task = require('../models/taskModel');

exports.new = async function (req, res, next) {
    let task = new Task({
        name: entities.encode(req.body.name),
        is_done: req.body.is_done
    });

    task = await task.save();

    return res.status(200).send(task);
};

exports.update = async function (req, res, next) {
    console.log(req.body);
    try {
        id = new mongoose.Types.ObjectId(req.params.id);
    } catch (err) {
        let newErr = new Error('Invalid user id: ' + req.params.uid + ' (Caused by: ' + err.message + ')');
        return res.status(400).send(newErr);
    }

    let task = await Task.findOne({ _id: id }).exec();

    if (task) {
        task.name = req.body.name;
        task.is_done = req.body.is_done;

        task = await task.save();

        return res.status(200).send(task);
    }
    return res.status(500).send('Task is null');
};

exports.list = async function (req, res, next) {
    let tasks = await Task.find().exec();

    return res.status(200).send({ list: tasks });
};