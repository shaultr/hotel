import styles from './style.module.css';
import { useState } from 'react';
export default function PopUpRoom({images, roomType}) {

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.popup}>
      <h2 className={styles.titlePopup}>{roomType}</h2>
      <div className={styles.popDiv}>
        <img className={styles.popImage} src={images[currentImage]?.image_url} alt={`Image ${currentImage + 1}`} />
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
      <button style={{cursor: 'pointer'}} onClick={prevImage}>&lt;</button>
      <button style={{cursor: 'pointer'}} onClick={nextImage}>&gt;</button>
    </div>
  )
}