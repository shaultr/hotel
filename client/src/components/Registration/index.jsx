import style from './style.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

export default function Registration() {
  const location = useLocation();

  const [fullName, setFullName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();

  const queryParams = queryString.parse(location.search);
  const room_id = queryParams.room_id;
  const payment_amount = queryParams.payment_amount;
  const startDate = queryParams.startDate;
  const endDate = queryParams.endDate;
  const numBeds = queryParams.num_beds;
  console.log("payment_amount & roomId:", payment_amount, room_id);
  const signedUp = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/admin/newBooking`, { fullName: fullName, phoneNumber: phoneNumber, email: email, room_id: room_id, payment_amount: payment_amount, startDate: startDate, endDate: endDate });
      console.log("response:", response.data);
      // setComment([...comment, response.data]);
    } catch (error) {
      console.error('Error occurred during authentication:', error);
    }
  };

  const handleSubmit = () => {
    if (fullName === null || phoneNumber === null || email === null) {
      alert("אנה הזן את כל הנתונים!!")
    } else {
      signedUp();


    }

  };

  function calculateDateDifference() {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInMillis = end - start;
    const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
    return differenceInDays;
  }
  const numDays = calculateDateDifference();

  const monthNames = [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
  ];
  

  const arrStartData = startDate.split('-');
  let sday = parseInt(arrStartData[2], 10);
  let smonth = parseInt(arrStartData[1], 10)
  let syear = parseInt(arrStartData[0], 10)
  
  
  let arrEndData = endDate.split('-');
  let eday = parseInt(arrEndData[2], 10);
  let emonth = parseInt(arrEndData[1], 10);
  let eyear = parseInt(arrEndData[0], 10)


  return (<div className={style.registration}>
    <div className={style.invation}>
      <div className={style.date}>
        <h3>{"מ-" +sday + " ב" + monthNames[smonth-1] + " "  + syear }</h3>
        <h3>{"עד " +eday + " ב" + monthNames[emonth-1] + " "  + eyear } |</h3>
        {numDays === 1 ? <h3>{numDays + " יום"}</h3> : <h3>{numDays + " ימים"}</h3>}
      </div>
      <div className={style.info}>
        <h4>{numBeds + " מיטות"}</h4>
      </div>
      <h2>לתשלום</h2>
      <h2>{payment_amount}</h2>
    </div>
    <div className={style.form}>
      <div className={style.title}>Registration</div>
      <form >
        <label>
          <input
            placeholder='Full Name:'
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            pattern="[A-Za-z]+\s[A-Za-z]+"
            title="Please enter first and last names"
            required
          />
        </label>

        <label>
          <input
            placeholder='Phone Number:'
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            // onKeyPress={(e) => {
            //   const charCode = e.which ? e.which : e.keyCode;
            //   if (charCode < 48 || charCode > 57) {
            //     e.preventDefault();
            //   }
            // }}
            required
          />

        </label>

        <label>
          <input
            placeholder='Email:'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern=".+@.+\..+"
            title="Please enter a valid email address"
            required
          />
        </label>

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div></div>
  );
}