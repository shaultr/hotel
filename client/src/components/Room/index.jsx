import styles from './style.module.css';
import Popup from 'reactjs-popup';
import PopUpRoom from '../PopUpRoom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
export default function Room({ room }) {
  const { Room_id, Price_per_night } = room;
  const navigate = useNavigate();

  const registration = () => {
    navigate('/registration');
  }

  const getImagesByRoomId = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/images/2`)
      return data;
    }
    catch (err) {

    }
  };

  
  const getArrImages = async () => {
    const [x] = await getImagesByRoomId()
    return x;
  };
  let image = getArrImages();

  console.log(image);
  useEffect(() => {
    getArrImages()
  }, [])

  return (
    <div className={styles.room}>
      <div className={styles.container}>
        <Popup trigger={
          <img src={image} />
        } position="right center">
          <PopUpRoom />
        </Popup>
        <div className={styles.info}>
          <ul>
            <li>מרפסת</li>

            <li>ארון בגדים
            </li>

            <li>טלפון</li>
            <li>מיבש שיער
            </li>
            <li>חלוק רחצה
            </li>
            <li>מיניבר
            </li>


          </ul>
        </div>
        <div className={styles.total}>
          {Price_per_night}

          <div className={styles.butten} onClick={registration}> הזמן עכשיו</div>
        </div>
      </div>
    </div>
  )
}
