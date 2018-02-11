const loginMiddleware = require('../middlewares/loginRequireMiddleware');
const reportController = require('../controllers/reportController');

module.exports = app => {

    app.get('/monthsumary',loginMiddleware,reportController.monthSumary);

    app.get('/monthstatement', loginMiddleware, reportController.monthStatement);
}