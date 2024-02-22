const pool = require('./main');


async function isAdmin(name, email) {
    const SQL = `SELECT * FROM customers WHERE full_name = ? AND email = ?`;
    const [data] = await pool.query(SQL,[name, email]);
    console.log(data);
    return data;
}
isAdmin('a', 'ab')
//get all bookings for administration
async function getAllBookings() {
    const SQL = `SELECT * FROM bookings ORDER BY booking_id DESC`;
    const [data] = await pool.query(SQL);
    return data;// return array of object
}

// get all bookings actives for administration 
async function getActiveBookings() {
    const SQL = `SELECT *
    FROM bookings
    WHERE CURDATE() BETWEEN start_date AND end_date
    ORDER BY booking_id DESC`;
        const [data] = await pool.query(SQL);
    return data;
}

// get all bookings that finished before 
async function getFinishedBookings() {
    const SQL = `SELECT *
    FROM bookings
    WHERE end_date < CURDATE()
    ORDER BY booking_id DESC`;
        const [data] = await pool.query(SQL);
    return data;
}


//get all bookings pending for administration 
async function getPendingBookings() {
    const SQL = `SELECT *
    FROM bookings
    WHERE start_date > CURDATE()
    ORDER BY booking_id DESC`;
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
    const TheNewBooking = await getBooking(data.insertId);
};

async function newCustomer(full_name, phone, email, adress, credit_card_number) {
    let SQL = `INSERT INTO customers (full_name, phone, email, address, credit_card_number)
    VALUES (?,?,?,?,?);`;
    const [data] = await pool.query(SQL, [full_name, phone, email, adress, credit_card_number]);
    const TheNewCustomer = await getCustomer(data.insertId);
    return TheNewCustomer;
};

// פונקציה לקבלת לקוח לפי מזהה הלקוח
async function getCustomer(customerId) {
    let SQL = `SELECT * FROM customers WHERE customer_id = ?;`;
    const [customer] = await pool.query(SQL, [customerId]);
    return customer[0];
}

async function deleteBooking(bookingId) {
    const result = await getBooking(bookingId)
    const SQL = `DELETE FROM bookings
    WHERE booking_id = ?`;
    const [data] = await pool.query(SQL, [bookingId]);
    console.log(result);
    return result
    };

module.exports = {
    isAdmin,
    getAllBookings,
    getActiveBookings,
    getFinishedBookings,
    getPendingBookings,
    newBooking,
    getCustomer,
    getBooking,
    newCustomer,
    deleteBooking
}