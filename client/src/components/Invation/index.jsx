import style from './style.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, addDays } from 'date-fns';
import { useContext } from 'react';
import DataContext from '../../context/DataContext'

const Invation = () => {
  const {currentDate, startDate, setStartDate, endDate,setEndDate} = useContext(DataContext);
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let nextDate = addDays(currentDate, 1);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd") : null;
    const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : null;
    navigate('/rooms?startDate=' + formattedStartDate + '&endDate=' + formattedEndDate)
  }

  return (
    <div className={style.invation}>
      <div className={style.title} >Invation</div>
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
      {/* <label htmlFor="endDate">End Date:</label> */}
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
      <button onClick={handleButtonClick}>חפש חדרים</button>

    </div>
  );
};
export default Invation;