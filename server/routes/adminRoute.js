const express = require("express");
const { getBooking, getPendingBookings, getActiveBookings, getAllBookings } = require("../../database/query");

const adminRoute = express.Router();

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