const express = require("express");
const {isAdmin, newCustomer, getCustomer, newBooking, getBooking, getPendingBookings, getActiveBookings,
    getAllBookings } = require("../../database/bookingQuery");

const adminRoute = express.Router();

adminRoute.get('/validation/:name/:email', async (req, res) => {
    try {
        const [customer] = await isAdmin(req.params.name, req.params.email);
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

adminRoute.post("/newBooking", async (req, res) => {
    try {
        const { fullName, phoneNumber, email, room_id, payment_amount, startDate, endDate } = req.body;
        const newC = await newCustomer(fullName, phoneNumber, email);
        const customer_id = newC.customer_id;

        const newB = await newBooking(customer_id, room_id, startDate, endDate, payment_amount, 1);
        res.json(newB);
        console.log("newB:", newB[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});



adminRoute.get("/getBooking/:book", async (req, res) => {
    try {
        const book = await getBooking(req.params.book);
        res.json(book);
        // console.log("book");
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

adminRoute.get("/getPeddingBookings", async () => {
    try {
        const pending = await getPendingBookings();
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
adminRoute.get("/getActiveBookings", async (req, res) => {
    try {
        const activies = await getActiveBookings();
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
adminRoute.get("/getAllBookings", async (req, res) => {
    try {
        const bookings = await getAllBookings();
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

module.exports = adminRoute;