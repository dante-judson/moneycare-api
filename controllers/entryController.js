const mongoose = require('mongoose');

const entryModel = mongoose.model('entry');

exports.listAll = async (req, res) => {
    let user = req.user;

    const entries = await entryModel.find({ userId:user.id});
    res.status(200).send(entries);
}

exports.save = async (req, res) => {
    let user = req.user;
    let entry = req.body;

    entry.userId = user.id;
    const savedEntry = await new entryModel(entry).save();

    res.status(201).send(savedEntry);
}