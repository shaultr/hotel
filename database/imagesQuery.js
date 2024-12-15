const pool = require('./main');

//add image 
async function addImage(imageUrl, roomId) {
    try {
        const SQL_IMAGE = `INSERT INTO images (image_url) VALUES (?)`;
        const [data] = await pool.query(SQL_IMAGE, [imageUrl]);

        const SQL_ROOM = `INSERT INTO room_images (room_id, image_id) VALUES (?, ?)`;
        const [imageToRoom] = await pool.query(SQL_ROOM, [roomId, data.insertId]);
        return {data, imageToRoom};
    } catch (error) {
        console.error('Error inserting image into the database:', error);
        throw error;
    }
};

//get all images
async function getAllImages() {
    const SQL = `SELECT image_url FROM images`;
    const [data] = await pool.query(SQL);
    return data;
};

async function getAllImagesByRoom(roomId) {
    const SQL = `SELECT image_url
    FROM room_images
    JOIN images ON room_images.image_id = images.image_id 
    WHERE room_id = ?`;
    const [data] = await pool.query(SQL, [roomId]);
    return data;
};

module.exports = {
    getAllImages,
    getAllImagesByRoom,
    addImage
}