import style from './style.module.css';
import Imprssives from '../../components/Impressives';

export default function Home() {
    return (
        <div>
            <div className={style.container}>

                <div className={style.image}>
                    {/* <img src='/images/home.jpg' /> */}
                </div>

                <div className={style.abaut}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nihil et cum laborum quis dolores, quia, pariatur ab minima eaque alias, adipisci ut aliquid repudiandae ipsam animi ullam suscipit veritatis!
                </div>


            </div>
            <Imprssives />
        </div>
    )
}
