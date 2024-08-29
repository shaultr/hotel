import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <div className={styles.footer}>
      <div>
        <a href='#' className={styles.a}>  גלריה  </a>
        <a href='#' className={styles.a}> | חדרי המלון  </a>
        <a href='#' className={styles.a} onClick={() => navigate('/myBookings')}> | ההזמנות שלי  |</a>
        <a href='#' className={styles.a}>   צור קשר  </a>




      </div>
    </div>
  )
}
