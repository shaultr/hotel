const express = require("express");
const functions = require("../../database/bookingQuery");
require("dotenv").config({ path: '../.env' });
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET
const adminRoute = express.Router();


adminRoute.get('/loginAdmin/:name/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const token = jwt.sign({ email }, TOKEN_SECRET, { expiresIn: '1h' });
        const [customer] = await functions.isAdmin(req.params.name, req.params.email);
        if (customer?.is_admin === 1) {
            res.json({ customer, token });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        console.log(err); 
    }
});




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


adminRoute.post("/newCustomer", async (req, res) => {
    try {
        const { fullName, phoneNumber, email } = req.body;
        const tokenData = { fullName, phoneNumber, email };
        const token = jwt.sign(tokenData, TOKEN_SECRET, { expiresIn: '1h' });
        const newCust = await functions.newCustomer(fullName, phoneNumber, email);
        res.send({ newCust, token });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send();
    }
});

// authenticateToken 
adminRoute.post("/newBooking", async (req, res) => {
    try {
        const { customer_id, room_id, payment_amount, startDate, endDate } = req.body;
        const newBooki = await functions.newBooking(customer_id, room_id, startDate, endDate, payment_amount, 1);
        res.json(newBooki);
    } catch (error) {
        console.log("rrr");
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

adminRoute.delete('/:bookingId',authenticateToken, async (req, res) => {
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