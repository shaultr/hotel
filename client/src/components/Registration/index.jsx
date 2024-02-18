import style from './style.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import jsPDF from 'jspdf';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

export default function Registration() {
  const schema = Yup.object().shape({
    fullName: Yup.string().required('שם מלא הוא שדה חובה'),
    email: Yup.string().email('כתובת דוא"ל לא תקינה').required('דוא"ל הוא שדה חובה'),
    phone: Yup.string().matches(/^[0-9]+$/, 'מספר הטלפון יכול לכלול רק מספרים').required('מספר טלפון הוא שדה חובה'),
    creditNumber: Yup.number().min(10).required('מספר אשראי לא תקין')
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const location = useLocation();




  const [customerName, setCustomerName] = useState('');
  const [form, setForm] = useState('bookingForm');

  const queryParams = queryString.parse(location.search);
  const room_id = queryParams.room_id;
  const payment_amount = queryParams.payment_amount;
  const startDate = queryParams.startDate;
  const endDate = queryParams.endDate;
  const numBeds = queryParams.numBeds;
  const pension = queryParams.pension;

  const signedUp = async (data) => {
    try {
      const response = await axios.post(`http://localhost:8000/admin/newBooking`, { fullName: data.fullName, phoneNumber: data.phoneNumber, email: data.email, room_id: room_id, payment_amount: payment_amount, startDate: startDate, endDate: endDate });
      console.log("response:", response.data);
    } catch (error) {
      console.error('Error occurred during authentication:', error);
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    setCustomerName(data.fullName);
    console.log(data);
    signedUp(data);
    setForm('bookingForm');
  };
  const onSubmitBooking = (data) => {
    alert('creditNumber')
    setForm('success');
  }

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
    doc.text('Welcome ' + customerName, 10, 10);
    doc.text('____________________', 10, 20);
    doc.text('Booking details:', 10, 30);
    doc.text('- Room with ' + numBeds + ' beds', 10, 40);
    doc.text('- Dates: ' + startDate + ' to ' + endDate, 10, 50);
    doc.text('- Total days: ' + numDays, 10, 60);
    doc.text('________', 10, 70);
    doc.text('Total payable: ', 10, 90);
    doc.text(payment_amount, 10, 100);

    doc.save('your_booking.pdf');
    setForm(false);

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

    {form === 'registerForm' &&
    <div className={style.form}>
      <div className={style.title}>הרשמה </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className={style.input}
          placeholder='שם מלא...' {...register('fullName')}
          type="text"
        />

        <input
          className={style.input}
          placeholder='מספר טלפון...' {...register('phone')}
          type="text"
        />

        <input
          className={style.input}
          placeholder='דואר אלקטרוני...'{...register('email')}
          type="text"

        />
        <p>{errors.email?.message}</p>
        <p>{errors.phone?.message}</p>
        <p>{errors.fullName?.message}</p>

        <input type='submit' />

      </form>
    </div>}
    {form === 'bookingForm'&&
    <div className={style.formbooking}>
    <div className={style.title}> פרטי כרטיס אשראי</div>
    <form onSubmit={handleSubmit(onSubmitBooking)}>
      <input className={style.input}
        placeholder=' מספר כרטיס...' {...register('creditNumber')}
        type="text"
      />
<div>


<select className={style.input} {...register('date')} defaultValue="01">
          <option>01</option>
          <option>02</option>
          <option>03</option>
          <option>04</option>
          <option>05</option>
          <option>06</option>
          <option>07</option>
          <option>08</option>
          <option>09</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
        </select>
        <select className={style.input} {...register('date')} defaultValue="2023">
          <option>2023</option>
          <option>2024</option>
          <option>2025</option>
          <option>2026</option>
        </select>
        </div>


      <input type='submit' />

    </form>
  </div>
    }
    {form === 'success' && <div>
      הזמנתך התקבלה בהצלחה
      <div className={style.print} onClick={print}>הדפס פרטי הזמנה</div>
    </div>}
  </div>
  );
}