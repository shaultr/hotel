import styles from './style.module.css';
import Popup from 'reactjs-popup';
import PopUpRoom from '../PopUpRoom'
import { useNavigate } from 'react-router-dom';

export default function Room() {

  const navigate = useNavigate();
  const registration = () => {
    navigate('/registration');
  }

  return (
    <div className={styles.room}>
      <div className={styles.container}>
        <Popup trigger={
          <img src='https://www.cvent.com/sites/default/files/image/2021-10/hotel%20room%20with%20beachfront%20view.jpg' />
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
          999.90
        <div className={styles.butten} onClick={registration}> הזמן עכשיו</div>
          </div>
      </div>
    </div>
  )
}
