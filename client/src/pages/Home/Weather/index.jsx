import styles from './style.module.css';
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
// const translate = require('translate-google');

export default function Weather() {
    const [info, setInfo] = useState({})
    const [city, setCity] = useState('')
    const [newCity, setNewCity] = useState('jerusalem')
    console.log(city);

    const apiWeather = async () => {
        let url = `https://api.openweathermap.org/data/2.5/
weather?q=${newCity}
&APPID=be94bea097de3bd08ecb9c79c443e17c&units=metric`
        try {

            let res = await axios.get(url)
            setInfo(res?.data)
        }
        catch (err) {

        }
    }
    useEffect(() => {
        apiWeather()
    }, [newCity])

    return (
        <div className={styles.weatherContainer}>
            {info?.name && <>
                <h4>weather in city of {info?.name}</h4>
                <div className={styles.temp}>
                <h4>{info?.weather[0]?.main}</h4>
                <img src={`http://openweathermap.org/img/w/${info?.weather[0].icon}.png`} alt='Weather Icon' style={{ width: '50px', border: 'none' }} />
                </div>
                <h4>temperature: {info?.main?.temp.toFixed(1)}</h4>
                <div className={styles.form}>
                    <input className={styles.input} type="text" onChange={(e) => setCity(e.target.value)} />
                    <input className={styles.send} type='submit' value={"חפש עיר"} onClick={() => setNewCity(city)} />
                </div>
            </>
            }

        </div>
    )
}
