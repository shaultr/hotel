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
    const images = ['http://res.cloudinary.com/dx08knp7p/image/upload/v1726777095/images/nbb6dgvvbrzavrctm0cu.jpg',
        './images/home1.jpg',
        'http://res.cloudinary.com/dx08knp7p/image/upload/v1726679761/images/tozgu8w2honlfaiqtfc3.jpg'];
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

                    ברוכים הבאים למלון שלנו – המקום המושלם לחופשה בלתי נשכחת. אצלנו תיהנו משילוב ייחודי של שירות ברמה גבוהה, נוחות מקסימלית, ונוף עוצר נשימה. המלון מציע חדרים מפוארים, מסעדות גורמה, וספא מפנק, הכל כדי להעניק לכם חוויית אירוח יוצאת דופן. בואו להירגע ולהתפנק באווירה יוקרתית ומרגיעה.




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
