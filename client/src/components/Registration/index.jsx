import style from './style.module.css';
import React, { useState } from 'react';

export default function Registration() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log('Full Name:', fullName);
    console.log('Phone Number:', phoneNumber);
    console.log('Email:', email);
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