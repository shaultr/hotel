const express = require('express');
const joi = require('joi');
const rooms = express.Router();
const functions = require('../../database/roomsQuery')




//get all rooms available by date
// rooms.get('/', async (req, res) => {
//     req.query
// })


//get all rooms available by date
rooms.get('/:start_date/:end_date/:numbeds', async (req, res) => {
     
    try {
        const data = await functions.getRoomsAvailables(req.params.start_date, req.params.end_date , req.params.numbeds);
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