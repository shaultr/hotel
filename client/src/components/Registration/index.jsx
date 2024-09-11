import style from './style.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import jsPDF from 'jspdf';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import e from 'cors';

export default function Registration() {
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    fullName: Yup.string().required('שם מלא הוא שדה חובה'),
    email: Yup.string().email('כתובת דוא"ל לא תקינה').required('דוא"ל הוא שדה חובה'),
    phone: Yup.string().matches(/^[0-9]+$/, 'מספר הטלפון יכול לכלול רק מספרים').required('מספר טלפון הוא שדה חובה'),
    password: Yup.string()
      .min(6, 'הסיסמה חייבת להיות באורך של לפחות 6 תווים')
      .required('סיסמה היא שדה חובה'),
  });
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      creditNumber: '',
      dayDate: '01',
      yearDate: '2023'
    }
  });

  const location = useLocation();


  const [availability, setAvailability] = useState(true);
  const [customerName, setCustomerName] = useState('');
  const [customer, setCustomer] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState('registerForm');
  const [customerId, setCustomerId] = useState(0);

  const getCustomerByToken = async () => {
    if (!localStorage.token) {
      setIsLoggedIn(false);
      return
    }
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:8000/customer/`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      if(res.data){
        const cust = res.data;
        setCustomer(cust)
        setIsLoggedIn(true);
        setForm('bookingForm')
        setCustomerName(cust.full_name);
        setCustomerId(cust?.customer_id)
      }
    }
    catch (error) {
      console.log('error: ', error);
    }
  }
  useEffect(() => {
    getCustomerByToken();
  }, [])

  useEffect(() => {
    if (form === 'bookingForm' && customer) {
      reset({
        creditNumber: '',  // אפשר לשים ערך כברירת מחדל אם יש נתונים שמורים
        dayDate: '01',
        yearDate: '2023'
      });
    }
  }, [form, customer, reset]);

  const queryParams = queryString.parse(location.search);
  const room_id = queryParams.room_id;
  const payment_amount = queryParams.payment_amount;
  const startDate = queryParams.startDate;
  const endDate = queryParams.endDate;
  const numBeds = queryParams.numBeds;
  const pension = queryParams.pension;

  const newCustomer = async (data) => {
    const customer_email = data.email;
    const customer = await axios.get(`http://localhost:8000/customer/getCustomer/${customer_email}`);
    try {
      if (customer.data) {
        const id = customer.data.customer?.customer_id;
        setCustomerId(id);
        const token = customer.data.token;
        localStorage.setItem('token', token);
        setForm('bookingForm');
        return;
      }

      const response = await axios.post(`http://localhost:8000/customer/newCustomer`, {
        fullName: data.fullName,
        phoneNumber: data.phone,
        email: data.email,
        password: data.password
      });

      const newCustomerId = JSON.stringify(response.data.newCust.customer_id)
      setCustomerId(newCustomerId);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setForm('bookingForm');

    } catch (error) {
      console.error('Error occurred during authentication:', error);
    }
  };

  const testAvailability = async () => {
    console.log('ff');
    try {
      const response = await axios.get(
        `http://localhost:8000/rooms/getRoomById/${room_id}/${startDate}/${endDate}}`)
      if (response.data) {
        newBooking()
        console.log('success', response.data);
      }

    }
    catch (error) {
      console.log('Error occurred during');
      setAvailability(false)
    }
  };

  const newBooking = async () => {
    console.log('customerrr');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/admin/newBooking',
        {
          customer_id: customerId,
          room_id: room_id,
          payment_amount: payment_amount,
          startDate: startDate,
          endDate: endDate
        },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
      setForm('success');

    } catch (error) {
      console.error('Error occurred during authentication:', error);
    }
  };


  const onSubmitCustomer = (data) => {
    newCustomer(data);
    setCustomerName(data.fullName);
  };

  const onSubmitBooking = (e) => {
    e.preventDefault()
    console.log('www');
    
    testAvailability()
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


  const arrStartData = startDate?.split('-');
  let sday = parseInt(arrStartData[2], 10);
  let smonth = parseInt(arrStartData[1], 10)
  let syear = parseInt(arrStartData[0], 10)


  let arrEndData = endDate?.split('-');
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
    navigate('/')
  }
  return (<div className={style.registration}>
    {form !== 'success' &&
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
    }
    {form === 'registerForm' &&
      <div className={style.form}>
        <div className={style.title}>הרשמה </div>
        <form onSubmit={handleSubmit(onSubmitCustomer)}>
          <input className={style.input}
            placeholder='שם מלא...' {...register('fullName')}
            type="text"
          />

          <p style={{ color: 'red' }}>{errors.fullName?.message}</p>
          <input
            className={style.input}
            placeholder='מספר טלפון...' {...register('phone')}
            type="text"
          />
          <p style={{ color: 'red' }}>{errors.phone?.message}</p>

          <input
            className={style.input}
            placeholder='דואר אלקטרוני...'{...register('email')}
            type="text"

          />
          <input
            className={style.input}
            placeholder=' סיסמא...'{...register('password')}
            type="password"
          />
          <p style={{ color: 'red' }}>{errors.password?.message}</p>

          <input type='submit' />

        </form>
      </div>}
    {form === 'bookingForm' &&
      <div className={style.formbooking}>
        <div className={style.title}> {customer && <h5>שלום {customer.full_name}</h5>}  </div>
        <div className={style.title}> פרטי כרטיס אשראי</div>

        <form onSubmit={onSubmitBooking}>
          <input className={style.input}
          placeholder=' מספר כרטיס...'
          type="number"
          required
          />
          <div>


            <select className={style.input} {...register('dayDate')} defaultValue="01">
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
            <select className={style.input} {...register('yearDate')} defaultValue="2023">
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
            </select>
            <p>{errors.dayDate?.message}</p>

          </div>

          <input type='submit' value={'אישור הזמנה'} />
          {!availability && <div style={{ color: 'red' }}>החדר המבוקש לא זמין. יש לבחור תאריך אחר </div>}
        </form>
      </div>
    }
    {form === 'success' && <div className={style.success}>
      <>
        <div className={style.circle}>✔️</div>
        <h1>
          הזמנתך התקבלה בהצלחה
        </h1>
      </>
      <div className={style.print} onClick={() => navigate('/myBookings')}> צפיה בהזמנות שלך </div>
      <div className={style.print} onClick={print}>הדפס פרטי הזמנה</div>
    </div>}
  </div>
  );
}