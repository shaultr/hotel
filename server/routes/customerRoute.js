const express = require("express");
const functions = require("../../database/bookingQuery");
require("dotenv").config({ path: '../.env' });
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { authenticate } = require("../auth");

const TOKEN_SECRET = process.env.TOKEN_SECRET
const customerRoute = express.Router();

customerRoute.get("/",authenticate, async (req, res) => {
    try {
        const result = await functions.getCustomerByEmail(req.customer.email);
        res.send(result)    
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }

})

customerRoute.get("/login/:email/:password", async (req, res) => {
    const { email } = req.params;
    try {
        const token = jwt.sign({ email }, TOKEN_SECRET, { expiresIn: '1h' });
        const customer = await functions.getCustomerByEmail(req.params.email);
        if (!customer) {
            throw { msg: 'Customer not found' };
        }
        const correctPassword = bcrypt.compareSync(req.params.password, customer.password);
        if (!correctPassword) {
            throw { msg: 'bad password' };
        }
        res.json({ customer, token });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.msg || 'Internal Server Error');
    }
});

// customerRoute.get("/authenticateToken/:token", async (req, res) => {
//     const tokenParams = req.params.token;

//     try {
//         const decodedToken = jwt.verify(tokenParams, process.env.TOKEN_SECRET);
//         if (!decodedToken) {
//             return res.status(401).json({ valid: false, msg: 'Token is invalid or expired' });
//         }

//         res.json({ valid: true });
//     } catch (error) {
//         console.error('Token verification error:', error);
//         if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
//             return res.status(401).json({ valid: false, msg: 'Invalid or expired token' });
//         }
//         res.status(500).send('Internal Server Error');
//     }
// });



customerRoute.get("/getCustomer/:email", async (req, res) => {
    
    const email = req.params.email;
    try {
        const customer = await functions.getCustomerByEmail(email);
        if (customer){
            const tokenData = { email };
            const token = jwt.sign(tokenData, TOKEN_SECRET, { expiresIn: '1h' });
            res.send({ customer, token });
        }
        else{  
            res.send("not found");
        }
        console.log('llc customer route');

    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

customerRoute.post("/newCustomer", async (req, res) => {
    try {
        const { fullName, phoneNumber, email, password } = req.body;
        const hash = bcrypt.hashSync(password, 10)
        const tokenData = { fullName, phoneNumber, email, password };
        const token = jwt.sign(tokenData, TOKEN_SECRET, { expiresIn: '1h' });
        const newCust = await functions.newCustomer(fullName, phoneNumber, email, hash);
        res.send({ newCust, token });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send();
    }
});


function authenticateToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        // console.error('Authorization header missing');
        return res.status(401).send('authorization header missing');
    }

    const token = authorizationHeader.split('Bearer ')[1];

    if (!token) {
        console.error('Bearer token missing in Authorization header');
        return res.status(401).send('Bearer token missing in Authorization header');
    }

    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (error) {
        console.error('Invalid token:', error);
        res.status(401).send('Invalid token');
    }
}




// authenticateToken 

customerRoute.get("/getBookingsByCustomer/:customer_id", async (req, res) => {
    const customer_id = req.params.customer_id;
    try {
        const bookings = await functions.getBookingByCustomer(customer_id);
        if (bookings) {
            res.json(bookings);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
}
);




customerRoute.delete('/:bookingId', authenticateToken, async (req, res) => {
    try {
        const data = await functions.deleteBooking(req.params.bookingId);
        if (data) {
            res.json(data);
            return;
        }
        res.status(404).send();
    }
    catch (error) {
        res.status(500).send();
    };

});
module.exports = customerRoute;