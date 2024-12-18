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
  const [emailAddress, setEmailAddress] = useState('');
  const [name, setName] = useState('');
  const [emailIsSent, setEmailIsSent] = useState(false);
  const getCustomerByToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found.');
      setIsLoggedIn(false);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8000/customer/`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        const cust = res.data;
        setCustomer(cust);
        setIsLoggedIn(true);
        setForm('bookingForm');
        setCustomerName(cust.full_name);
        setCustomerId(cust?.customer_id);
      }
    } catch (error) {
      console.log('Token invalid or expired:', error);
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    }
  };


  useEffect(() => {
    getCustomerByToken();
    const storedEmail = localStorage.getItem('email');
    const storedFullName = localStorage.getItem('name');
    if (storedEmail) setEmailAddress(storedEmail);
    if (storedFullName) setName(storedFullName);
  }, [])

  const queryParams = queryString.parse(location.search);
  const room_id = queryParams.room_id;
  const payment_amount = queryParams.payment_amount;
  const startDate = queryParams.startDate;
  const endDate = queryParams.endDate;
  const numBeds = queryParams.numBeds;
  const pension = queryParams.pension;

  const sendEmail = async () => {

    const emailData = {
      to: emailAddress,
      subject: "תודה שהזמנת אצלנו! הנה פרטי ההזמנה שלך",
      html: `
      <div style="text-align: right; direction: rtl; font-family: Arial, sans-serif; line-height: 1.5;">

        <p>שלום ${name},</p>
        <p>תודה שהזמנת חדר במלון.</p>
        <p>להלן פרטי ההזמנה שלך:</p>
        <ul>
          <li>תאריכים: ${startDate} עד ${endDate}</li>
          <li>מספר מיטות: ${numBeds}</li>
        </ul>

        <p>נשמח לארח אותך!<br>בברכה,<br>צוות המלון</p>
        <a href="http://localhost:3000/myBookings" 
   style="color: white; 
          background-color: #007BFF; 
          padding: 10px 20px; 
          text-decoration: none; 
          border-radius: 5px; 
          display: inline-block; 
          font-weight: bold; 
          text-align: center;">
    לאיזור האישי באתר 
</a>
        </div>
      `,
    };


    try {
      const response = await axios.post(
        "http://localhost:8000/rooms/send-email",
        emailData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Email sent successfully:", response.data);
        setEmailIsSent(true);
        setTimeout(() => {
          setEmailIsSent(false);
        }, 5000);
      } else {
        console.error("Failed to send email:", response.data.message);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };


  const newCustomer = async (data) => {
    const customer_email = data.email;

    try {
      console.log('Trying to find existing customer...');
      const customer = await axios.get(`http://localhost:8000/customer/getCustomer/${customer_email}`);

      if (customer.data && customer.data.customer) {
        console.log('Customer found:', customer.data.customer);
        const id = customer.data.customer.customer_id;
        setCustomerId(id);
        const token = customer.data.token;
        localStorage.setItem('token', token);
        setForm('bookingForm');
        return;
      } else {
        console.log('Customer not found, creating a new one...');
      }

    } catch (error) {
      console.log('Customer not found, proceeding to create a new customer...');
    }

    try {
      console.log('Creating a new customer...');
      const response = await axios.post(`http://localhost:8000/customer/newCustomer`, {
        fullName: data.fullName,
        phoneNumber: data.phone,
        email: data.email,
        password: data.password
      });

      console.log('New customer created:', response.data);
      const newCustomerId = response.data.newCust.customer_id;
      setCustomerId(newCustomerId);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setForm('bookingForm');

    } catch (error) {
      console.error('Error occurred during new customer creation:', error);
    }
  };


  const testAvailability = async () => {
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
      if (response.status === 200) {
        sendEmail()
        setForm('success');
      }


    } catch (error) {
      console.error('Error occurred during authentication:', error);
    }
  };


  const onSubmitCustomer = (data) => {
    newCustomer(data);
    setCustomerName(data.fullName);
    localStorage.setItem("name", data.fullName);

  };

  const onSubmitBooking = () => {
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
        monthNames={monthNames}
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
      <>
        <div onClick={sendEmail}>שלח אימייל</div>
        <RegisterForm
          name={name}
          setName={setName}
          emailAddress={emailAddress}
          setEmailAddress={setEmailAddress}
          handleSubmit={handleSubmit}
          onSubmitCustomer={onSubmitCustomer}
          register={register}
          errors={errors} />
      </>
    }
    {form === 'bookingForm' &&

      <CreditForm onSubmitBooking={onSubmitBooking}
        availability={availability}
        payment={payment_amount}
        />

    }
    {form === 'success' && <div className={style.success}>
      <>
        {
          emailIsSent &&
          <div className={style.notification}>שלחנו אליך אימייל עם פרטי ההזמנה. להתראות</div>
        }
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