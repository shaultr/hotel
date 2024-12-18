const pool = require('./main');


//get room available by room id   
async function getRoomById(roomId, startDate, endDate) {
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
//get all rooms
async function getAllRooms() {
    const SQL = `SELECT * FROM rooms`;
    const [data] = await pool.query(SQL);
    return data;
}
async function getRoomIds() {
    const SQL = `SELECT room_id FROM rooms`;
    const [data] = await pool.query(SQL);
    const roomIds = data.map((row) => row.room_id);
    return roomIds;
}
module.exports = {
  getRoomById,
  getRoomsAvailables,
  getAllRooms,
  getRoomIds
}