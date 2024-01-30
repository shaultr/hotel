import styles from './style.module.css';
import Room from '../../components/Room';
import DataContext from '../../context/DataContext'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { format, addDays } from 'date-fns';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';


export default function Rooms() {
  const location = useLocation();


  const queryParams = queryString.parse(location.search);
  const startDate = queryParams.startDate;
  const endDate = queryParams.endDate;
  console.log('Start Date:', startDate);
  console.log('End Date:', endDate);


  const [rooms, setRooms] = useState([]);

  const getRooms = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/rooms/${startDate}/${endDate}`)
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

  const arrStartData = startDate.split('-');
  let sday = parseInt(arrStartData[2], 10);
  let smonth =  parseInt(arrStartData[1], 10)


  let arrEndData = endDate.split('-');
  let eday = parseInt(arrEndData[2], 10);
  let emonth = parseInt(arrEndData[1], 10);

  const monthNames = [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
  ];

  return (
    <div>
      <h1>
        {"חדרים פנוים בין " + sday + " ל" + monthNames[smonth-1] + " "
          + "ובין" + " " + eday + " ל" + monthNames[emonth-1]
        }
      </h1>

      <div className={styles.rooms}>
        {showRooms()}
      </div>



    </div>
  )
}
