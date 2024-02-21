const pool = require('./main');


//get all rooms available by room   
async function getRoomAvailable(startDate, endDate, roomId) {
    const SQL = `
    SELECT *
    FROM rooms
    WHERE room_id = ${roomId}
      AND Availability = 1
      AND room_id NOT IN (
        SELECT room_id
        FROM bookings
        WHERE (start_date BETWEEN '${startDate}' AND '${endDate}')
           OR (end_date BETWEEN '${startDate}' AND '${endDate}')
      );
  `;
    const [data] = await pool.query(SQL);
    return data[0];
};

//get all rooms available by date
async function getRoomsAvailables(startDate, endDate, numBeds) {
    const SQL = `
    SELECT *
    FROM rooms
    WHERE 
      Availability = 1
      AND num_beds = ${numBeds}
      AND room_id NOT IN (
        SELECT DISTINCT room_id
        FROM bookings
        WHERE (start_date BETWEEN '${startDate}' AND '${endDate}')
          OR (end_date BETWEEN '${startDate}' AND '${endDate}')
      );
  `;
    const [data] = await pool.query(SQL);
    return data;
}

getRoomsAvailables('2024-02-01', '2024-02-02',2)

module.exports = {
    getRoomAvailable,
    getRoomsAvailables,
}