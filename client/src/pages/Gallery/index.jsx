import styles from './style.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Gallery() {
  const [images, setImages] = useState([]);

  const getImages = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/images/`)
      console.log(data);
      setImages(data);
    }
    catch (err) {

    }
  };

    useEffect(() => {
      getImages()
    }, []);

    const showImages = () => {

      return images.map(image =>
        <div className={styles.image}>
          <img src = {image?.image_url} />
        </div>
      )
    };

  return (
    <div className={styles.container}>
      {showImages()}
      </div>
  )
  }
