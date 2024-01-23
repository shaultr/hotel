import style from './style.module.css';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
const Invation = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleButtonClick = () => {
    const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd") : null;
    const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : null;
if (formattedStartDate === null || formattedEndDate===null ) {
  alert("נא הזן נתונים בתאריכים");
  return;
}
    console.log('Start Date:', formattedStartDate);
    console.log('End Date:', formattedEndDate);
  };
  return (
    <div className={style.invation}>
      <div className={style.title} >Invation</div>
      {/* <label htmlFor="startDate">Start Date:</label> */}
      <DatePicker
      placeholderText='Start Date:'
      id="startDate"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      selectsStart
      startDate={startDate}
      endDate={endDate}
      dateFormat="yyyy-MM-dd"
      />
      {/* <label htmlFor="endDate">End Date:</label> */}
      <DatePicker
      placeholderText='End Date:'
        id="endDate"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat="yyyy-MM-dd"
      />
      <button onClick={handleButtonClick}>בדוק זמינות</button>
      
    </div>
  );
};
export default Invation;