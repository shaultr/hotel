const express = require('express');
const joi = require('joi');
const rooms = express.Router();
const functions = require('../../database/roomsQuery')

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


module.exports = rooms;