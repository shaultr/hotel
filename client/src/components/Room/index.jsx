import styles from './style.module.css';
import Popup from 'reactjs-popup';
import PopUpRoom from '../PopUpRoom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Room({ room, difference, dates }) {
  const [extension, setExtension] = useState(0);
  const [pension, setPension] = useState(false);
  const [choose , setChoose] = useState(false);

  const { room_id, price_per_night, room_type, num_beds } = room;
  const { startDate, endDate } = dates
  const navigate = useNavigate();


  const registration = () => {
    if(dates.endDate!==undefined){
      extension === 0 && navigate(`/registration/?room_id=${room_id}&payment_amount=${total}&startDate=${startDate}&endDate=${endDate}&numBeds=${num_beds}`);
      extension > 0 && navigate(`/registration/?room_id=${room_id}&payment_amount=${total}&startDate=${startDate}&endDate=${endDate}&numBeds=${num_beds}&pension=${pension}`);
    }
    else{
      setChoose(!choose)
    }
  }
  const [images, setImages] = useState([]);

  const handleScroll = () => {
    setChoose(false)
  };
  useEffect(() => {
    setChoose(false)
    axios.get(`http://localhost:8000/images/${room_id}`)
      .then((i) => setImages(i.data))
  }, [dates])

  window.addEventListener('scroll', handleScroll);

  const handlePension = () => {
    setPension(!pension);
    extension === 0 ? setExtension(300) : setExtension(0);
  }
  const total = price_per_night * difference + extension;
  return (
    <div className={styles.room}>
      <div className={styles.container}>
        <Popup trigger={
          <div className={styles.image}>
            <img src={images[0]?.image_url} />
          </div>
        } position="right center">
          <PopUpRoom images={images} roomType={room_type}/>
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
            <h3>{room_id}</h3>
            <h4>{" מספר מיטות: " + num_beds}</h4>
          </div>

          <div className={styles.basic} >
            <h4> ☕</h4>
            <h4 >לינה וארוחת בוקר </h4>

            <h4 > {parseInt(price_per_night)}</h4>
          </div>

          <div className={styles.l} style={{ backgroundColor: pension && "#cea1005c" }} >
            <h4>   🍽️ </h4>
            <h4>  חצי פנסיון </h4>
            <h4>    {parseInt(price_per_night) + 300}</h4>
            <div className={styles.choise} onClick={handlePension}>
              {pension ? "בטל" : "בחר"}
            </div>

          </div>

        </div>
        <div className={styles.total}>
          {dates.endDate!==undefined && <div className={styles.details}>
            מחיר עבור לילה:{price_per_night}
            <br />
            עבור {difference} ימים :
            {total}
          </div>
}
      
          <div className={styles.butten} onClick={registration}> 
         {
          dates.endDate!==undefined ? "הזמן עכשיו" : "בדוק זמינות"
         }
          </div>
       {choose&&
          <div className={styles.choose}>קודם יש לבחור תאריך</div>
       }
        </div>
      </div>
    </div>
  )
}