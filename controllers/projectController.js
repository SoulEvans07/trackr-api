const entities = require('html-entities').AllHtmlEntities;
const Project = require('../models/projectModel');

exports.list = async function (req, res, next) {
    let projects = await Project.find().exec();

    // TODO: only list projects which are visible for the user
    return res.status(200).send(projects);
};

exports.new = async function (req, res, next) {

    let project = new Project({
        name: entities.encode(req.body.name),
        color: entities.encode(req.body.color),
        owner: res.currentUser,
        team: req.body.team,
        tasks: []
    });

    project = await project.save();

    return res.status(200).send(project);
};

exports.get = async function (req, res, next) {
    let project = await Project.findById(req.params.id).exec();

    if (!project) {
        return res.status(400).send('No project with id: ' + req.params.id);
    }

    return res.status(200).send(project);
};

exports.update = async function (req, res, next) {
    let project = await Project.findById(req.params.id).exec();

    if (!project) {
        return res.status(400).send('No project with id: ' + req.params.id);
    }

    // TODO: sanity checks
    // TODO: all attribute
    project.name = req.body.name;
    project.color = entities.encode(req.body.color);

    project = await project.save();

    return res.status(200).send(project);
};

exports.delete = async function (req, res, next) {
    let project = await Project.findById(req.params.id).exec();

    if (!project) {
        return res.status(400).send('No project with id: ' + req.params.id);
    }

    await project.delete();

    return res.status(200).send();
};
