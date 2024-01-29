const express = require('express');
const images = express.Router();
const functions = require('../../database/imagesQuery')


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
images.get('/:roomId', async (req, res) => {
     
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