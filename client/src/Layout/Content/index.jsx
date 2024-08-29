import styles from './style.module.css';
import Rooms from '../../pages/Rooms'
import Registration from '../../components/Registration';
import Gallery from '../../pages/Gallery';
import Home from '../../pages/Home';

import { Route, Routes } from 'react-router-dom';
import MyBookings from '../../pages/MyBookings';

export default function Content() {

    return (
        <div >
            <div className={styles.backgroundContainer}></div>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/rooms' element={<Rooms />} />
                <Route path='/registration' element={<Registration />} />
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/myBookings' element={<MyBookings />} />
            </Routes>
            <div className={styles.InvationContainer}>
            </div>
            <div className={styles.map}>
                
            </div>
        </div>
    )
}
