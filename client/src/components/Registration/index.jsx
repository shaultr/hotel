import style from './style.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { calculateDateDifference } from '../../functions/functions';
import { print } from '../../functions/functions';
import RegisterForm from '../RegisterForm'
import CreditForm from '../‏CreditForm'
import OrderDetails from '../OrderDetails';

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
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
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
      if (res.data) {
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
    testAvailability()
  }


  const numDays = calculateDateDifference(startDate, endDate);

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

  const handlePrint = () => {
    print(customerName, numBeds, startDate, endDate, payment_amount, numDays, () => navigate('/'));
  };

  return (<div className={style.registration}>
    {form !== 'success' &&
    <OrderDetails sday={sday}
    monthNames= {monthNames}
    smonth={smonth}
    syear={syear}
    emonth={emonth}
    eyear={eyear}
    eday={eday}
    numDays={numDays}
    numBeds={numBeds}
    pension={pension}
    payment_amount={payment_amount} />
    
    }
    {form === 'registerForm' &&
      <RegisterForm
        handleSubmit={handleSubmit}
        onSubmitCustomer={onSubmitCustomer}
        register={register}
        errors={errors} />
    }
    {form === 'bookingForm' &&

        <CreditForm onSubmitBooking={onSubmitBooking}
          availability={availability}
          register={register}
          errors={errors} />
      
    }
    {form === 'success' && <div className={style.success}>
      <>
        <div className={style.circle}>✔️</div>
        <h1>
          הזמנתך התקבלה בהצלחה
        </h1>
      </>
      <div className={style.print} onClick={() => navigate('/myBookings')}> צפיה בהזמנות שלך </div>
      <div className={style.print} onClick={handlePrint}>הדפס פרטי הזמנה</div>
    </div>}
  </div>
  );
}