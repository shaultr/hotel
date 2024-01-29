import styles from './style.module.css';
import Room from '../../components/Room';
import DataContext from '../../context/DataContext'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { format, addDays } from 'date-fns';


export default function Rooms() {
  const { startDate, endDate } = useContext(DataContext);
  
  const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd") : null;
  const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : null;
  
  const [rooms, setRooms] = useState([]);

  const getRooms = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/rooms/${formattedStartDate}/${formattedEndDate}`)
      console.log(formattedStartDate);
      setRooms(data);
    }
    catch (err) {

    }
  };

  useEffect(() => {
    getRooms()
  }, []);

  const showRooms = () => {

    return rooms.map(room => <Room key={room.room_id} room={room} />)

  };

  let sday = startDate.getDate();
  let smonth = startDate.getMonth() + 1;
  let syear = startDate.getFullYear();
  let eday = endDate.getDate();
  let emonth = endDate.getMonth() + 1;
  let eyear = endDate.getFullYear();
  const monthNames = [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
  ];

  return (
    <div>
      <h1>
        {"חדרים פנוים בין התאריכים: " + sday + " ב" + monthNames[smonth] + " "
          + "ובין" + " " + eday + " ל" + monthNames[emonth]
        }
      </h1>

      <div className={styles.rooms}>
        {showRooms()}
      </div>



    </div>
  )
}
