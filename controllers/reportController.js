const mongoose = require('mongoose');

const entryModel = mongoose.model('entry');

exports.monthSumary = (req, res) => {
    let user = req.user;

    let currentDate = new Date();

    let firstMonthDay = new Date();
    firstMonthDay.setDate(1);
    firstMonthDay.setHours(00,00,00);

    entryModel.find({ createdDate: { "$gte": firstMonthDay, "$lte": currentDate }, userId: user.id })
        .then(findedEntries => {
            let revenues = 0;
            let expenses = 0;

            findedEntries.forEach(entry => {
                if (entry.type === 'Receita') {
                    revenues += entry.value;
                } else {
                    expenses += entry.value;
                }
            });

            res.send({
                revenues: revenues,
                expenses: expenses
            });
        }).catch(err => {
            res.status(400).send({ message: err.message });
        })
}

exports.monthStatement = (req, res) => {
    let user = req.user;

    let currentDate = new Date();

    let firstMonthDay = new Date();
    firstMonthDay.setDate(1);
    firstMonthDay.setHours(00,00,00);

    entryModel.find({ createdDate: { "$gte": firstMonthDay, "$lte": currentDate }, userId: user.id })
        .then(findedEntries => {
            res.send(findedEntries);
        }).catch(err => {
            res.status(400).send({ message: err.message });
        })
}

exports.report = (req, res) => {
    let user = req.user;

    let initialDate = req.params.initialDate;
    let finalDate = req.params.finalDate;
    let description = req.params.description;
    let type = req.params.type;

    let query = new Object();

    query.userId = user.id;

    if ((initialDate != 'undefined') && (initialDate != '') && (initialDate != 'null')) {
        query.createdDate = new Object();
        query.createdDate.$gte = new Date(initialDate);
    }

    if ((finalDate != 'undefined') && (finalDate != '') && (finalDate != 'null')) {
        if(!query.createdDate){
            query.createdDate = new Object();
        }
        query.createdDate.$lte = new Date(finalDate);
    }

    if ((description != 'undefined') && (description != '') && (description != 'null')) {
        query.description = description;
    }

    if ((type != 'undefined') && (type != '') && (type != 'null')) {
        query.type = type;
    }

    entryModel.find(query).then(findedEntries => {
        res.send(findedEntries);
    }).catch(err => {
        res.status(400).send({ message: err.message });
    });
}