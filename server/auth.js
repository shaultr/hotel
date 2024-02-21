const jwt = require("jsonwebtoken");
require("dotenv").config({ path: '../.env' });
const TOKEN_SECRET = process.env.SECRET

const generate = (customer = {}) => {
    const { customer } = req.body.customer;

    let token = jwt.sign(customer, TOKEN_SECRET, { expiresIn: '7d' })
    return token
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, customer) => {
        if (err) return res.sendStatus(403);
        req.customer = customer;
        next()
    })
}


module.exports = {
    generate,
}