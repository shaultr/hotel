import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';

export default function Impressives() {

  const navigate = useNavigate();
  const goGallery = () => {
    navigate('/gallery')
  }
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <div className={styles.backImage} onClick={goGallery}>
          <h3>צפה בגלריה</h3>
        </div>
        <img src='/images/pool.jpg' />
      </div>

      <div className={styles.image}>
        <div className={styles.backImage} onClick={goGallery}>
          <h3>צפה בגלריה</h3>
        </div>
        <img src='/images/loby.jpg' />
      </div>

      <div className={styles.image}>
        <div className={styles.backImage} onClick={goGallery}>
          <h3>צפה בגלריה</h3>
        </div>
        <img src='/images/food.jpg' />
      </div>

    </div>
  )
}
