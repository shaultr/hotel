import styles from './style.module.css';
import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';
import PopupGallery from './PopupGallery';

export default function Gallery() {
  const [images, setImages] = useState([]);

  const getImages = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/images/`)
      setImages(data);
    }
    catch (err) {

    }
  };

  useEffect(() => {
    getImages()
  }, []);

  const showImages = () => {

    return images.map((image, index) =>

      <Popup trigger={
        <div className={styles.image}>
          <div className={styles.backImage}>
            <div className={styles.circle}>➕</div>
          </div>
          <img src={image?.image_url} />
        </div>
      } position="right center">
        <PopupGallery index={index} images={images} />
      </Popup>



    )
  };

  return (
    <div className={styles.container}>
      {showImages()}
    </div>
  )
}