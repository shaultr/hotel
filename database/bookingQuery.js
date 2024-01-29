const pool = require('./main');

//get all bookings for administration
async function getAllBookings() {
    const SQL = `SELECT * FROM bookings ORDER BY booking_id DESC`;
    const [data] = await pool.query(SQL);
    return data;// return array of object
}

//get all bookings actives for administration 
async function getActiveBookings() {
    const SQL = `SELECT * FROM bookings WHERE booking_status = 'Confirmed' ORDER BY booking_id DESC`;
    const [data] = await pool.query(SQL);
    return data;
}



//get all bookings pending for administration 
async function getPendingBookings() {
    const SQL = `SELECT * FROM bookings WHERE booking_status = 'Pending' ORDER BY booking_id DESC`;
    const [data] = await pool.query(SQL);
    console.log(data);
    return data;
};


//get booking by id
async function getBooking(bookingId) {
    const SQL = `SELECT *
    FROM bookings
    WHERE booking_id = ?`;
    const [data] = await pool.query(SQL, [bookingId]);
    console.log(data);
    return data;
};


// new booking 
async function newBooking(customer_id, room_id, start_date, end_date, payment_amount, booking_status) {
    const SQL = `INSERT INTO bookings
    (customer_id, room_id,start_date, end_date, payment_amount, booking_status)
    VALUES (?,?,?,?,?,?)`;
    const [data] = await pool.query(SQL, [customer_id, room_id, start_date, end_date, payment_amount, booking_status]);
    const t = await getBooking(data.insertId);
    console.log(t);
};

module.exports = {
    getAllBookings,
    getActiveBookings,
    getPendingBookings: getPendingBookings,
    newBooking
}