import styles from './style.module.css';
import Popup from 'reactjs-popup';
import PopUpRoom from '../PopUpRoom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Room({ room, difference  }) {
  const { room_id, price_per_night, room_type, num_beds } = room;
  const navigate = useNavigate();

  const registration = () => {
    navigate('/registration');
  }

  const [images, setImages] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:8000/images/${room_id}`)
      .then((i) => setImages(i.data))
  }, [])

console.log(images[0]?.image_url);

  return (
    <div className={styles.room}>
      <div className={styles.container}>
        <Popup trigger={
          <div className={styles.image}>
          <img src={images[0]?.image_url} />
          </div>
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
          <h3>{room_type + " מספר מיטות: " + num_beds}</h3>
          <h3>{ }</h3>
        </div>
        <div className={styles.total}>
          <div className={styles.datails}>
          מחיר עבור לילה:{price_per_night } 
          <br />
          עבור {difference} ימים :</div>
          {price_per_night*difference}

          <div className={styles.butten} onClick={registration}> הזמן עכשיו</div>
        </div>
      </div>
    </div>
  )
}