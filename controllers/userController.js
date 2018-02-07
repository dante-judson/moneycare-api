const mongoose = require('mongoose');
const keys = require('../config/keys')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('user');

exports.register = (req, res) => {
    let user = new User(req.body);
    
    user.hash_password = bcrypt.hashSync(req.body.password,10);

    user.save((error, user) => {
        if(error){
            res.status(400).send({
                message: error.message
            });
        } else {
            user.hash_password = null;
            res.status(201).send(user);
        }
    });
};

exports.login = (req, res) => {
    User.findOne({ username: req.body.username }, (error, user) => {
 
        if(error){
            throw error;
        }
        if(!user){
            res.status(401).send({ message: 'Authetication failed. User not found' });
        } else {
            
            if(!user.comparePassword(req.body.password,user.hash_password)){
                res.status(401).send({ message: 'Authentication failed. Wrong password' });
            } else {
                res.send({ token: jwt.sign({username: user.username, id: user._id}, keys.jwtKey) });
            }

        }
    });
}