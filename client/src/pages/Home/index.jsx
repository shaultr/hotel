import style from './style.module.css';
import Imprssives from '../../components/Impressives';
import { useState, useEffect } from 'react';

export default function Home() {
    const images = ['./images/1a.jpg', './images/home1.jpg', './images/home2.jpg'];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
    
        return () => clearInterval(intervalId);
      }, [currentImageIndex, images.length]);

    return (
        <div>
            <div className={style.container}>

                <div className={style.image}>
                </div>

                <div className={style.abaut}>

                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nihil et cum laborum quis dolores, quia, pariatur ab minima eaque alias, adipisci ut aliquid repudiandae ipsam animi ullam suscipit veritatis!
                    <br />
                    <br />
                    <img src={images[currentImageIndex]} />
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nihil et cum laborum quis dolores, quia, pariatur ab minima eaque alias, adipisci ut aliquid repudiandae ipsam animi ullam suscipit veritatis!
                </div>


            </div>
            <Imprssives />
        </div>
    )
}
