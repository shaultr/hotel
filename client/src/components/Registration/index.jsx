import style from './style.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import jsPDF from 'jspdf';

export default function Registration() {
  const location = useLocation();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const queryParams = queryString.parse(location.search);
  const room_id = queryParams.room_id;
  const payment_amount = queryParams.payment_amount;
  const startDate = queryParams.startDate;
  const endDate = queryParams.endDate;
  const numBeds = queryParams.numBeds;
  const pension = queryParams.pension;

  const signedUp = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/admin/newBooking`, { fullName: fullName, phoneNumber: phoneNumber, email: email, room_id: room_id, payment_amount: payment_amount, startDate: startDate, endDate: endDate });
      console.log("response:", response.data);
    } catch (error) {
      console.error('Error occurred during authentication:', error);
    }
  };
  console.log('fullName' + fullName);
  const handleSubmit = () => {
    if (fullName === '' || phoneNumber === '' || email === '') {
      alert(" הזן את כל הנתונים!!")
    } else {
      signedUp();
      setSuccess(true);
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

  const print = () => {
    const doc = new jsPDF();
    doc.
    doc.text('wellcome ' + fullName + '. Booking a room with ' + numBeds + ' beds, between the dates ' + startDate + ' and ' + endDate + ' a total of ' + numDays + ' days. Total payable ' + payment_amount, 10, 10);
    doc.save('your_booking.pdf');
    setSuccess(false);

  }
  return (<div className={style.registration}>
    <div className={style.invation}>
      <div className={style.date}>
        <h3>{"מ-" + sday + " ב" + monthNames[smonth - 1] + " " + syear}</h3>
        <h3>{"עד " + eday + " ב" + monthNames[emonth - 1] + " " + eyear} |</h3>
        {numDays === 1 ? <h3>{numDays + " יום"}</h3> : <h3>{numDays + " ימים"}</h3>}
      </div>
      <div className={style.info}>
        <div className={style.x}>

          <div className={style.beds}>
            <h4>{numBeds + " מיטות"}</h4>
          </div>

          <div className={style.pension}>
            <h4>{pension && " חצי פנסיון"}</h4>
          </div>
        </div>


      </div>
      <div className={style.payment}>
        <h2>לתשלום</h2>
        <h2>{payment_amount}</h2>
      </div>
    </div>

    {!success ? <div className={style.form}>
      <div className={style.title}>הרשמה</div>
      <form >
        <label>
          <input
            className={style.input}
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
            className={style.input}
            placeholder='Phone Number:'
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

        </label>

        <label>
          <input
            className={style.input}
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
          הזמן
        </button>
      </form>
    </div> : <div>
      הזמנתך התקבלה בהצלחה
      <div className={style.print} onClick={print}>הדפס פרטי הזמנה</div>
    </div>}
  </div>
  );
}