const express = require('express');
const images = express.Router();
const functions = require('../../database/imagesQuery')
const joi = require('joi');

function validation(req, res, next) {
    const schemaRoomId = joi.number().min(1);
    const { error } = schemaRoomId.validate(req.params.roomId);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    next();
}

//get all images
images.get('/', async (req, res) => {

    try {
        const data = await functions.getAllImages();
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

//get all images by room
images.get('/:roomId', validation, async (req, res) => {

    try {
        const data = await functions.getAllImagesByRoom(req.params.roomId);
        if (data) {
            res.json(data);
            console.log(data);
            return;
        }
        res.status(404).send();
    }
    catch (error) {
        res.status(500).send();
    };

});










module.exports = images;