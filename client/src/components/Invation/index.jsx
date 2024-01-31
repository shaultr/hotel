import style from './style.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, addDays } from 'date-fns';
import { useContext } from 'react';
import DataContext from '../../context/DataContext'
import Popup from 'reactjs-popup';


const Invation = () => {

  const { currentDate, startDate, setStartDate, endDate, setEndDate, numBeds, setNumBeds } = useContext(DataContext);
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let nextDate = addDays(currentDate, 1);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd") : null;
    const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : null;
    navigate('/rooms?startDate=' + formattedStartDate + '&endDate=' + formattedEndDate + '&numbeds=' + numBeds)
  }
  const handlePlus = () => {
    numBeds < 5 && setNumBeds(numBeds + 1)
    console.log(numBeds);
  }
  const handleMinus = () => {
    numBeds > 2 && setNumBeds(numBeds - 1)
    console.log(numBeds);
  }
  return (
    <div className={style.invation}>
      <div className={style.title} >Invation</div>
      <button onClick={handleButtonClick}>חפש חדרים</button>
      <DatePicker
        placeholderText={day + 1 + " " + month + " " + year}
        id="endDate"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={nextDate}
        dateFormat="yyyy-MM-dd"
      />
      <DatePicker
        placeholderText={day + " " + month + " " + year}
        id="startDate"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={currentDate}
        dateFormat="yyyy-MM-dd"
      />

      <Popup trigger={
        <input type='text' placeholder={`   ${numBeds}  אורחים`} />
      } position="right center">

        <div className={style.numbeds}>
          <div className={style.plus} onClick={handlePlus}>+</div>
          {numBeds}
          <div className={style.plus} onClick={handleMinus}>-</div>
          בחר מספר אורחים
        </div>
      </Popup>
    </div>
  );
};
export default Invation;