const express = require('express');
const joi = require('joi');
const rooms = express.Router();
const functions = require('../../database/roomsQuery')


function validation(req, res, next) {
    const schemaNumBeds = joi.number().min(1);
    const schemaStartDate = joi.date().min(new Date());
    const schemaEndDate = joi.date().min(new Date());

    const { error: errorNumBeds } = schemaNumBeds.validate(req.params.numbeds);
    const { error: errorStartDate } = schemaStartDate.validate(req.params.start_date);
    const { error: errorEndDate } = schemaEndDate.validate(req.params.end_date);

    if (errorNumBeds || errorStartDate || errorEndDate) {
        res.status(400).send(errorNumBeds ? errorNumBeds.details[0].message : (errorStartDate ? errorStartDate.details[0].message : errorEndDate.details[0].message));
        return;
    }

    next();
}



//get all rooms available by date
// rooms.get('/', async (req, res) => {
//     req.query
// })


//get all rooms available by date
rooms.get('/:start_date/:end_date/:numbeds',validation, async (req, res) => {
     
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