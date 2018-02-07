const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, keys.jwtKey, (error, decode) => {

            if (error) {
                res.send({ message: 'Invalid Token' });
            } else {
                req.user = decode;
                next();
            }
        })
    } else {
        res.status(401).send({ message: 'No token provided!'});
    }
}