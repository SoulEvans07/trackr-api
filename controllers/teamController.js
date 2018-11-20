const entities = require('html-entities').AllHtmlEntities;
const Team = require('../models/teamModel');

exports.list = async function (req, res, next) {
    let teams = await Team.find().exec();

    // TODO: only list teams which are visible for the user
    return res.status(200).send(teams);
};

exports.new = async function (req, res, next) {
    if (!req.body.members.contains(res.currentUser)){
        req.body.members.push(res.currentUser);
    }

    let team = new Team({
        name: entities.encode(req.body.name),
        leader: res.currentUser,
        members: req.body.members,
    });

    team = await team.save();

    return res.status(200).send(team);
};

exports.get = async function (req, res, next) {
    let team = await Team.findById(req.params.id).exec();

    if (!team) {
        return res.status(400).send('No team with id: ' + req.params.id);
    }

    return res.status(200).send(team);
};

exports.update = async function (req, res, next) {
    let team = await Team.findById(req.params.id).exec();

    if (!team) {
        return res.status(400).send('No team with id: ' + req.params.id);
    }

    // TODO: sanity checks
    // TODO: all attribute
    team.name = req.body.name;

    team = await team.save();

    return res.status(200).send(team);
};

exports.delete = async function (req, res, next) {
    let team = await Team.findById(req.params.id).exec();

    if (!team) {
        return res.status(400).send('No team with id: ' + req.params.id);
    }

    await team.delete();

    return res.status(200).send();
};