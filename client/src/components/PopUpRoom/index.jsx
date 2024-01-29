import styles from './style.module.css';
import { useState } from 'react';
export default function PopUpRoom() {
  // const imagePath = '/images';

  const images = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg'
  ];
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.popup}>

      <h1 className={styles.titlePopup}>שם החדר</h1>
      <div>
        <img src={images[currentImage]} alt={`Image ${currentImage + 1}`} />
        <div className={styles.popRight}>
          <div className={styles.roomInclude}>
            <h4>החדר כולל</h4>
            <br />
            <br />
            <br />
            <ul>
              <li>מזגן</li>
              <li>מיני בר </li>
              <li>כספת</li>
              <li>טלויזיה</li>
              <li>ערכת קפה ותה</li>
            </ul>
          </div>
          {/* <div className={styles.sqr}>
          </div> */}
        </div>
      </div>
      <button onClick={prevImage}>&lt;</button>
      <button onClick={nextImage}>&gt;</button>
    </div>
  )
}









