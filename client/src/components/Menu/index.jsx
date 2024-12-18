import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

export default function Menu() {
  const navigate = useNavigate();
  
  return (
    <div className={styles.menu}>
      <h3>🌟🌟🌟🌟🌟</h3>
      <h1 style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>wellcome to the hotel</h1>
      <div>
        <a href='#' className={styles.a} onClick={() => navigate('/gallery')}> גלריה </a>
        <a href='#' onClick={() => navigate('/rooms')} className={styles.a}> | חדרי המלון  </a>
        <a href='#' className={styles.a} onClick={() => navigate('/myBookings')}> | ההזמנות שלי  | </a>
        <Popup trigger={<a className={styles.a}>צור קשר</a>} position="right center" closeOnDocumentClick>
          <div className={styles.popupContent}>
            <h3>פרטי המלון</h3>
            <p>כתובת: זריצקי דוד 3 ירושלים</p>
            <p>טלפון: 0779630866</p>
            <p> contact@hotel.com :דוא"ל </p>
          </div>
        </Popup>


      </div>

    </div>
  )
}