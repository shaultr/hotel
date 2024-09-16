const jwt = require("jsonwebtoken");
require("dotenv").config({ path: '../.env' });

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
        if (error.name === 'TokenExpiredError') {
            console.error('Token has expired:', error);
            return res.status(401).send('Token has expired');
        } else if (error.name === 'JsonWebTokenError') {
            console.error('Invalid token:', error);
            return res.status(401).send('Invalid token');
        } else {
            console.error('Token verification error:', error);
            return res.status(401).send('Token verification error');
        }
    }
}


module.exports = {
    authenticate
}