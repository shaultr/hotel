import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';
export default function Menu() {
  const navigate = useNavigate();
  
  return (
    <div className={styles.menu}>
      <h3>🌟🌟🌟🌟🌟</h3>
      <h1 style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>wellcome to the hotel</h1>
      <div>
        <a href='#gallery' className={styles.a}>  גלריה  </a>
        <a href='#' onClick={() => navigate('/rooms')} className={styles.a}> | חדרי המלון  </a>
        <a href='#' className={styles.a} onClick={() => navigate('/myBookings')}> | ההזמנות שלי  |</a>
        <a href='#' className={styles.a}>   צור קשר  </a>



      </div>

    </div>
  )
}