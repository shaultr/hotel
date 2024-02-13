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
  const numBeds = queryParams.numBeds;

  const dates = {
    startDate: startDate,
    endDate: endDate
  }
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
  }, [startDate,endDate , numBeds]);

  const showRooms = () => {

    return rooms.map(room => <Room key={room.room_id} room={room} difference={difference} dates={dates} />)

  };

  const arrStartData = startDate.split('-');
  let sday = parseInt(arrStartData[2], 10);
  let smonth = parseInt(arrStartData[1], 10)
  let syear = parseInt(arrStartData[0], 10)


  let arrEndData = endDate.split('-');
  let eday = parseInt(arrEndData[2], 10);
  let emonth = parseInt(arrEndData[1], 10);
  let eyear = parseInt(arrEndData[0], 10);

  const monthNames = [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
  ];

  return (
    <div>
      <div className={styles.searchResults}>
        <h3 className={styles.title}>פרטי חיפוש</h3>
        <br />
        <h4> מספר מיטות: {numBeds} </h4>
        <h4>   החל מ- {sday + " " + monthNames[smonth - 1] + " " + syear} </h4>
        <h4>    עד {eday + " " + monthNames[emonth - 1] + " " + eyear} </h4>

      </div>

      <div className={styles.rooms}>
        {showRooms()}
      </div>



    </div>
  )
}