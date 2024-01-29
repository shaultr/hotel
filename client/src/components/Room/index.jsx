import styles from './style.module.css';
import Popup from 'reactjs-popup';
import PopUpRoom from '../PopUpRoom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Room({ room }) {
  const { Room_id, Price_per_night, Room_type, Num_beds } = room;
  const navigate = useNavigate();

  const registration = () => {
    navigate('/registration');
  }

  const [images, setImages] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:8000/images/${Room_id}`)
      .then((i) => setImages(i.data))
  }, [])



  return (
    <div className={styles.room}>
      <div className={styles.container}>
        <Popup trigger={
          <img src={images[0]?.image_url} />
        } position="right center">
          <PopUpRoom images={images} />
        </Popup>
        <div className={styles.info}>
          <ul>
            <li>מרפסת</li>

            <li>ארון בגדים
            </li>

            <li>טלפון</li>

            <li>מיניבר
            </li>
            <li>שרות חדרים
            </li>

          </ul>
          <h3>{Room_type + " מספר מיטות: " + Num_beds}</h3>
          <h3>{ }</h3>
        </div>
        <div className={styles.total}>
          {Room_id}

          <div className={styles.butten} onClick={registration}> הזמן עכשיו</div>
        </div>
      </div>
    </div>
  )
}