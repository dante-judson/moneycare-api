const mongoose = require('mongoose');

const entryModel = mongoose.model('entry');

exports.monthSumary = (req, res) => {
    let user = req.user;

    let currentDate = new Date();

    let firstMonthDay = new Date();
    firstMonthDay.setDate(1);

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

    entryModel.find({ createdDate: { "$gte": firstMonthDay, "$lte": currentDate }, userId: user.id })
        .then(findedEntries => {
            res.send(findedEntries);
        }).catch(err => {
            res.status(400).send({ message: err.message });
        })
}