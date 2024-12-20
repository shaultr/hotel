const express = require('express');
const rooms = express.Router();
require("dotenv").config({ path: '../.env' });
const functions = require('../../database/roomsQuery')
const nodemailer = require("nodemailer");

//get all rooms 
rooms.get('/', async (req, res) => {
    try {
        const data = await functions.getAllRooms();
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
rooms.get('/roomIds', async (req, res) => {
    try {
        const data = await functions.getRoomIds();
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

//get all rooms available by date
rooms.get('/:start_date/:end_date/:num_beds', async (req, res) => {

    try {
        const data = await functions.getRoomsAvailables(req.params.start_date, req.params.end_date, req.params.num_beds);
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

//get room available by room id   
rooms.get('/getRoomById/:room_id/:start_date/:end_date', async (req, res) => {

    try {
        const data = await functions.getRoomById(req.params.room_id, req.params.start_date, req.params.end_date);
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

rooms.post("/send-email", async (req, res) => {
  const { to, subject, html } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ success: false, message: "Failed to send email" });
  }
});

  




module.exports = rooms;