import style from './style.module.css';
import Imprssives from '../../components/Impressives';
import { useState, useEffect } from 'react';
import Weather from './Weather'


// .weather{
//     top: 10px;
//     position: absolute;
//     /* border: 1px solid black; */
//     left: 60px;
//     width: 300px;


// <div className={styles.weather}>
// <Weather />
// </div>


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

                    Lorem ipsum dolor sit amet  elit.  dolores, quia, pariatur ab minima eaque alias, adipisci ut aliquid repudiandae ipsam animi ullam suscipit veritatis!
                    <br />
                    <br />
                    <img src={images[currentImageIndex]} />
                    <br />
                    <br />
                 <p className={style.infoRespon}>
                    </p>
                </div>


            </div>
            <Imprssives />
        </div>
    )
}
