const pool = require('./main');


//get all images
async function getAllImages() {
    const SQL = `SELECT image_url FROM images`;
    const [data] = await pool.query(SQL);
    return data;
};
getAllImages()
//get all images by room
async function getAllImagesByRoom(roomId) {
    const SQL = `SELECT image_url
    FROM room_images
    JOIN images ON room_images.image_id = images.image_id 
    WHERE room_id = ?`;
    const [data] = await pool.query(SQL, [roomId]);
    return data;
};
getAllImagesByRoom(2)
module.exports = {
    getAllImages,
    getAllImagesByRoom
}