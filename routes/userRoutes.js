const userController = require('../controllers/userController');

module.exports = app => {
    app.post('/login', userController.login);

    app.post('/register',userController.register);

    app.get('/user/email/:email',userController.checkEmail);

    app.get('/user/username/:username',userController.checkUsername);
}