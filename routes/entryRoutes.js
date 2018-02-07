const loginMiddleware = require('../middlewares/loginRequireMiddleware');
const entryController = require('../controllers/entryController');

module.exports = app => {
    app.get('/entry', loginMiddleware, entryController.listAll);

    app.post('/entry', loginMiddleware, entryController.save);
}