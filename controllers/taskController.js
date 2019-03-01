const entities = require('html-entities').AllHtmlEntities;
const UserListView = require('../models/userListViewModel');
const Task = require('../models/taskModel');

exports.list = async function (req, res, next) {
    let view = await UserListView.findOne({user: res.currentUser}).exec();
    // TODO: move to user creation
    if(!view){
        view = new UserListView({
            user: res.currentUser,
            project: undefined,
            list: []
        });

        await view.save();
    }
    let tasks = await Task.find({ assigner: res.currentUser })
        .populate("assignee")
        .populate("project").exec();

    tasks.forEach(task => {
        task.index = findIndex(task, view.list);
    });

    return res.status(200).send(tasks);
};

exports.new = async function (req, res, next) {
    let view = await UserListView.findOne({user: res.currentUser}).exec();
    let task = new Task({
        name: entities.encode(req.body.name),
        assigner: res.currentUser
    });

    console.log("new on " + req.body.index);
    task = await task.save();

    view.list.splice(req.body.index, 0, task);
    await view.save();
    task.index = req.body.index;

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
    task.description = req.body.description;
    task.is_done = req.body.is_done;

    task = await task.save();

    return res.status(200).send(task);
};

exports.delete = async function (req, res, next) {
    let view = await UserListView.findOne({user: res.currentUser}).exec();
    let task = await Task.findById(req.params.id).exec();

    if (!task) {
        return res.status(400).send('No task with id: ' + req.params.id);
    }

    await task.delete();

    let index = findIndex(task, view.list);
    console.log("delete " + index);
    view.list.splice(index, 1);
    await view.save();

    return res.status(200).send();
};

const findIndex = function(task, list){
    let id = String(task._id);
    for(let i = 0; i < list.length; i++){
        if(String(list[i]._id) === id)
            return i;
    }
};
