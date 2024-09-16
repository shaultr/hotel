const express = require('express');
const images = express.Router();
const functions = require('../../database/imagesQuery')
const joi = require('joi');
const multer = require('multer');
const { saveImgToCloud } = require('../cloudinary/cloudinary')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function validation(req, res, next) {
    const schemaRoomId = joi.number().min(1);
    const { error } = schemaRoomId.validate(req.params.roomId);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    next();
}
//add image
images.post('/', upload.single('file'), async (req, res) => {
    console.log(req.body.roomId);
    
    try {
        // if (!req.file) {
        //     return res.status(400).json({ error: 'No file uploaded' });
        // }

        // const uploadedImage = await saveImgToCloud(req.file);
        // if (!uploadedImage) {
        //     return res.status(500).json({ error: 'Image upload failed' });
        // }

        // const data = await functions.addImage(uploadedImage.image_url, req.roomId);
        
        // if (data) {
        //     return res.status(200).json(data);
        // }

        // res.status(404).send();
    } catch (error) {
        console.error('Error adding image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

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