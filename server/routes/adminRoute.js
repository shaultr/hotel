const express = require("express");
const functions = require("../../database/bookingQuery");
require("dotenv").config({ path: '../.env' });
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET
const adminRoute = express.Router();


adminRoute.get('/authentication/:name/:email', async (req, res) => {
    try {
        const [customer] = await functions.isAdmin(req.params.name, req.params.email);
        if (customer?.is_admin === 1) {
            res.json(customer);
        }
        else {
            res.status(401).send("Invalid")
        }
    }
    catch (err) {
        console.log(err);
    }
})



adminRoute.get("/getCustomer/:cust", async (req, res) => {
    try {
        const cust = await functions.getCustomer(req.params.cust);
        res.json(cust);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['Authorization']
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, customer) => {
        if (err) return res.sendStatus(403);
        req.customer = customer;
        next()
    })
}
adminRoute.post("/newCustomer", async (req, res) => {

    try {
        const { fullName, phoneNumber, email } = req.body;
        const tokenData = { fullName, phoneNumber, email };
        const token = jwt.sign(tokenData, TOKEN_SECRET, { expiresIn: '10m' });
        const newCust = await functions.newCustomer(fullName, phoneNumber, email);
        res.json({ newCust, token });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send();
    }});


adminRoute.post("/newBooking", async (req, res) => {
    try {
        const { customer_id, room_id, payment_amount, startDate, endDate } = req.body;
        const newBooki = await functions.newBooking(customer_id, room_id, startDate, endDate, payment_amount, 1);
        res.json(newBooki);
    } catch (error) {
        res.status(500).send();
    }
});



adminRoute.get("/getBooking/:book", async (req, res) => {
    try {
        const book = await functions.getBooking(req.params.book);
        res.json(book);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

adminRoute.get("/getAllBookings", async (req, res) => {
    try {
        const bookings = await functions.getAllBookings();
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
adminRoute.get("/getActiveBookings", async (req, res) => {
    try {
        const activies = await functions.getActiveBookings();
        if (activies) {
            res.json(activies);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
}
);
adminRoute.get("/getFinishedBookings", async (req, res) => {
    try {
        const bookings = await functions.getFinishedBookings();
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


adminRoute.get("/getPendingBookings", async (req, res) => {
    try {
        const pending = await functions.getPendingBookings();
        if (pending) {
            res.json(pending);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
}
);

adminRoute.delete('/:bookingId', async (req, res) => {
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
module.exports = adminRoute;