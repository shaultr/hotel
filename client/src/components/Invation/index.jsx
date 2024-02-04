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

  const [choiseEndDate, setChoiseEndDate] = useState(nextDate);

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

  const choiseDates = (date) => {
    setStartDate(date);
    let choise = addDays(date, 1);
    setChoiseEndDate(choise)
  }

  return (
    <div className={style.invation}>
      <div className={style.title} >Invation</div>
      <button onClick={handleButtonClick}>חפש חדרים</button>
      <DatePicker
        id="endDate"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={choiseEndDate}
        // dateFormat="dd yyyy  MMMM "
        />
      <DatePicker
        placeholderText={day + " " + month + " " + year}
        id="startDate"
        selected={startDate}
        onChange={(date) => choiseDates(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={currentDate}
        dateFormat=" yyyy MMMM dd"
      />

      <Popup trigger={
        <input type='text' placeholder={`   ${numBeds}  אורחים`} />
      } position="right center">

        <div className={style.numbeds}>
          <div className={style.plus} onClick={handlePlus} style={{ color: numBeds === 5 && "#A7AFA6" }}

          >+</div>
          {numBeds}
          <div className={style.plus} onClick={handleMinus} style={{ color: numBeds === 2 && "#A7AFA6" }}

          >-</div>
          בחר מספר אורחים
        </div>
      </Popup>
    </div>
  );
};
export default Invation;
