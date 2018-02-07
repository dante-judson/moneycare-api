const mongoose = require('mongoose');

const entryModel = mongoose.model('entry');

exports.listAll = async (req, res) => {
    let user = req.user;

    const entries = await entryModel.find({ userId: user.id });
    res.status(200).send(entries);
}

exports.save = (req, res) => {
    let user = req.user;
    let entry = req.body;

    entry.userId = user.id;
    new entryModel(entry).save().then(savedEntry => {
        res.status(201).send(savedEntry);
    }).catch(err => {
        res.status(400).send({ message: err.message });
    });
}

exports.update = (req, res) => {
    let id = req.params.id;
    entryModel.findById(id).then(oldEntry => {

            entryModel.findByIdAndUpdate(id, req.body).then(updatedEntry => {
                res.send(updatedEntry);
            }).catch(err => {
                res.status(400).send({ message: err.message });
            });
        
    }).catch(err => {
        res.status(404).send({ message: 'No entry founded for this id' });
    });
}

