import styles from './style.module.css';
import Popup from 'reactjs-popup';
import PopUpRoom from '../PopUpRoom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function Room({ room, difference, dates }) {
  const [pension, setPension] = useState(false);

  const { room_id, price_per_night, room_type, num_beds } = room;
  const { startDate, endDate } = dates
  const navigate = useNavigate();


  const registration = () => {
    navigate(`/registration/?room_id=${room_id}&payment_amount=${price_per_night * difference}&startDate=${startDate}&endDate=${endDate}`);
  }
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/images/${room_id}`)
      .then((i) => setImages(i.data))
  }, [])


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
          <div className={styles.type}>

            <h3>{room_type}</h3>
            <h4>{" מספר מיטות: " + num_beds}</h4>
          </div>

          <div className={styles.b} style={{ backgroundColor: pension && "#cea100" }} onClick={() => setPension(!pension)}>
            <h4 >לינה וארוחת בוקר</h4>
            <h4 > {parseInt(price_per_night)}</h4>
          </div>

          <div className={styles.l}>
            <h4>  חצי פנסיון </h4>
            <h4>    {parseInt(price_per_night) + 300}</h4>
          </div>

        </div>
        <div className={styles.total}>
          <div className={styles.datails}>
            מחיר עבור לילה:{price_per_night}
            <br />
            עבור {difference} ימים :</div>
          {price_per_night * difference}

          <div className={styles.butten} onClick={registration}> הזמן עכשיו</div>
        </div>
      </div>
    </div>
  )
}