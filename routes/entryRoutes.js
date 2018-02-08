const loginMiddleware = require('../middlewares/loginRequireMiddleware');
const entryController = require('../controllers/entryController');

module.exports = app => {
    app.get('/entry', loginMiddleware, entryController.listAll);

    app.post('/entry', loginMiddleware, entryController.save);

    app.put('/entry/:id',loginMiddleware, entryController.update);

    app.delete('/entry/:id',loginMiddleware, entryController.delete);

    app.get('/entry/:id',loginMiddleware, entryController.findById);
}