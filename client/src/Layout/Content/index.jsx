import styles from './style.module.css';
import Rooms from '../../pages/Rooms'
import Registration from '../../components/Registration';
import Gallery from '../../pages/Gallery';

import { Route, Routes } from 'react-router-dom';

export default function Content() {

    return (
        <div >
            <div className={styles.backgroundContainer}></div>

            <Routes>
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/registration' element={<Registration />} />
                <Route path='/rooms' element={<Rooms />} />
            </Routes>
            <div className={styles.InvationContainer}>
            </div>
            <div className={styles.map}>
                
            </div>
        </div>
    )
}
