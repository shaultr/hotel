import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';
import Weather from './Weather'
export default function Menu() {
  const navigate = useNavigate();

  return (
    <div className={styles.menu}>
      <h3>🌟🌟🌟🌟🌟</h3>
      <h1 style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>wellcome to the hotel</h1>
      <div>
        <a href='#' className={styles.a}>  גלריה  </a>
        <a href='#' className={styles.a}> | חדרי המלון  </a>
        <a href='#' className={styles.a}> | מבצעים  |</a>
        <a href='#' className={styles.a}>   צור קשר  </a>



      </div>
        <div className={styles.weather}>
        <Weather />
        </div>
    </div>
  )
}