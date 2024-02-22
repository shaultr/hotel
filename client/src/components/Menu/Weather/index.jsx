import styles from './style.module.css';
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Weather() {
    const [info, setInfo] = useState()

    const apiWeather = async (city) => {
        let url = `https://api.openweathermap.org/data/2.5/
weather?q=${city}
&APPID=be94bea097de3bd08ecb9c79c443e17c&units=metric`
        let res = await axios.get(url)
        console.log(res.data);
        setInfo(res.data)
    }
    useEffect(() => {
        apiWeather('jerusalem')
    }, [])

    return (
        <div>
                       {info?.name &&  <>
                <h3>weather in city of {info?.name}</h3>
                <h4>{info?.weather[0]?.main}</h4>
                <h4>{info?.main?.temp}</h4>
                <img src={`http://openweathermap.org/img/w/${info?.weather[0].icon}.png`} alt='Weather Icon' style={{ width: '50px', border: 'none'  }} />
            </>}

        </div>
    )
}
