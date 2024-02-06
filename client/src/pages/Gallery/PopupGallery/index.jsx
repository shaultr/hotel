import style from './style.module.css';
import { useState } from 'react';
export default function PopupGallery({index, images }) {

    const [currentImage, setCurrentImage] = useState(index);

    const nextImage = () => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className={style.popup}>
        <img className={style.popImage} src={images[currentImage]?.image_url} alt={`Image ${currentImage + 1}`} />
           <div className={style.buttons}>
            <div onClick={prevImage}><h2>⬅</h2></div>
            <div onClick={nextImage}><h2>➡</h2></div>
        
           </div>
        </div>
    )
}