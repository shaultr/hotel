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

  function calculateDateDifference() {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInMillis = end - start;
    const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
    return differenceInDays;
  }

  const queryParams = queryString.parse(location.search);
  const startDate = queryParams.startDate;
  const endDate = queryParams.endDate;
  const numBeds = queryParams.numbeds;

  console.log(numBeds);
  const [rooms, setRooms] = useState([]);
  const [difference, setDifference] = useState(0);
  const getRooms = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/rooms/${startDate}/${endDate}/${numBeds}`)
      setRooms(data);
    }
    catch (err) {

    }
  };

  useEffect(() => {
    setDifference(calculateDateDifference());
    getRooms()
  }, [startDate, endDate, numBeds, difference]);

  const showRooms = () => {

    return rooms.map(room => <Room key={room.room_id} room={room} difference={difference} />)

  };

  const arrStartData = startDate.split('-');
  let sday = parseInt(arrStartData[2], 10);
  let smonth = parseInt(arrStartData[1], 10)


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
        {"חדרים פנוים בין " + sday + " ל" + monthNames[smonth - 1] + " "
          + "ובין" + " " + eday + " ל" + monthNames[emonth - 1]
        }
      </h1>

      <div className={styles.rooms}>
        {showRooms()}
      </div>



    </div>
  )
}
