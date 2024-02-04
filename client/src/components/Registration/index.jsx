import style from './style.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

export default function Registration() {
  const location = useLocation();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const queryParams = queryString.parse(location.search);
  const room_id = queryParams.room_id;
  const payment_amount = queryParams.payment_amount;
  const startDate=queryParams.startDate;
  const endDate=queryParams.endDate;
  console.log("payment_amount & roomId:", payment_amount, room_id);
  const signedUp = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/admin/newBooking`, { fullName: fullName, phoneNumber: phoneNumber, email: email, room_id: room_id, payment_amount: payment_amount,startDate:startDate,endDate:endDate });
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
      console.log('Full Name:', fullName);
      console.log('Phone Number:', phoneNumber);
      console.log('Email:', email);

    }

  };

  return (
    <div className={style.registration}>
        <div className={style.invation}>
      פרטי הזמנה
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
      </div>
    </div>

  );
}