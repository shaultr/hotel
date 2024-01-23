const { get } = require('http');
const pool = require('./main');
const { log } = require('console');

//get all bookings for administration
async function getAllBookings() {
    const SQL = `SELECT * FROM bookings`;
    const [data] = await pool.query(SQL);
    return data;
};
//get booking by id
async function getBooking(bookindId) {
    const SQL = `SELECT *
    FROM bookings
    WHERE booking_id = ?`;
    const [data] = await pool.query(SQL, [bookindId]);
    console.log(data);
    return data;
};

// new booking 
async function newBooking(customer_id, room_id, start_date, end_date, payment_amount) {
    const SQL = `INSERT INTO bookings
    (customer_id, room_id,start_date, end_date, payment_amount)
    VALUES (?,?,?,?,?)`;
    const [data] = await pool.query(SQL, [customer_id, room_id, start_date, end_date, payment_amount]);
    const t = await getBooking(data.insertId);
    console.log(t);
};

newBooking(1, 1, '3034-01-01', '2034-01-05', 5000)

//get all images
async function getAllImages() {
    const SQL = `SELECT image_url FROM images`;
    const [data] = await pool.query(SQL);
    return data;
};

//get all images by room
async function getAllImagesByRoom(roomId) {
    const SQL = `SELECT image_url
    FROM room_images
    JOIN images ON room_images.image_id = images.image_id 
    WHERE room_id = ${roomId}
    `;
    const [data] = await pool.query(SQL);
    return data;
};


module.exports = {

}