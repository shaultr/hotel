import style from './style.module.css';
import Menu from '../components/Menu';
import Content from './Content';
import Footer from './Footer';
import Invation from '../components/Invation';
import { useState } from 'react';
import DataContext from '../context/DataContext';
import { format, addDays } from 'date-fns';

export default function Layout() {
    
    let currentDate = new Date();
    let nextDate = addDays(currentDate, 1);


    
    const [startDate, setStartDate] = useState(currentDate);
    const [endDate, setEndDate] = useState(nextDate);
    const [numBeds, setNumBeds] = useState(2);

    return (
        <div className={style.layout}>

            <Menu />
            <div className={style.container}>
                    <DataContext.Provider value={{ currentDate, startDate, setStartDate, endDate, setEndDate, numBeds, setNumBeds}}>
                <div className={style.InvationContainer}>
                        <Invation />
                </div>
                <Content />
                    </DataContext.Provider>
            </div>
            <div className={style.footerContainer}>
                <Footer />
            </div>
        </div>
    )
}