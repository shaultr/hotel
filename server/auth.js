const jwt = require("jsonwebtoken");
require("dotenv").config({ path: '../.env' });
const TOKEN_SECRET = process.env.SECRET

function authenticate(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        console.error('Authorization header missing');
        return res.status(401).send('Authorization header missing');
    }

    const token = authorizationHeader.split('Bearer ')[1];

    if (!token) {
        console.error('Bearer token missing in Authorization header');
        return res.status(401).send('Bearer token missing in Authorization header');
    }

    try {
        const customer = jwt.verify(token, process.env.TOKEN_SECRET);
        req.customer = customer;
        next();
    } catch (error) {
        console.error('Invalid token:', error);
        res.status(401).send('Invalid token');
    }
}

module.exports = {
    authenticate
}