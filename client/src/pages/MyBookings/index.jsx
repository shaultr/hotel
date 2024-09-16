import styles from './style.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { calculateDateDifference } from '../../functions/functions';

export default function MyBookings() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [customer, setCustomer] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [successDel, setSuccessDel] = useState(false);
    const [IdDel, setIdDel] = useState(0);

    const getAllBookings = async () => {
        const id = customer.customer_id;
        console.log(id);

        try {
            const { data } = await axios.get(`http://localhost:8000/customer/getBookingsByCustomer/${id}`);
            setBookings(data);
        } catch (err) {
            console.error('Error fetching bookings:', err);
        }
    };

    const deleteBooking = async (bookingId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const response = await axios.delete(`http://localhost:8000/admin/${bookingId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            if (response.status == 200) {

                const newArr = bookings.filter(booking => booking.booking_id !== bookingId);
                setBookings(newArr);
                setSuccessDel(true);
                setTimeout(() => {
                    setSuccessDel(false);
                }, 5000);
            }
        }
        catch (err) {
        }
    }

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
            if (res.statusCode === 200) {
                const cust = res.data;
                setCustomer(cust)
                setIsLoggedIn(true);
            }
        }
        catch (error) {
            console.log('error: ', error);
        }
    }

    useEffect(() => {
        getCustomerByToken();
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            getAllBookings();
        }
    }, [isLoggedIn]);

    // function calculateDateDifference(sd, ed) {
    //     const start = new Date(sd);
    //     const end = new Date(ed);
    //     const differenceInMillis = end - start;
    //     const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
    //     return differenceInDays;
    // }

    const login = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/customer/login/${password}/${email}`);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('cusromer', JSON.stringify(response.data.customer));
                setCustomer(response.data.customer);
                setIsLoggedIn(true);
            }
        }
        catch (err) {
            setIsAuthorized(false);
        }
    };


    if (!isLoggedIn) {
        return (
            <div className={styles.login}>
                <h1>הכנס פרטים</h1>
                <input className={styles.input} onChange={(e) => { setPassword(e.target.value); setIsAuthorized(true) }} name='email' type='email' placeholder="אימייל" />
                <input className={styles.input} onChange={(e) => { setEmail(e.target.value); setIsAuthorized(true) }} name='password' type="password" placeholder=" סיסמא" />
                <div className={styles.go} onClick={login}>כנס</div>
                {!isAuthorized && <h3 style={{ color: "red" }}>אין הרשאה</h3>}
            </div>
        );
    }


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('customer');
        window.location.reload();
    }

    const isDateInFuture = (date) => {
        const today = new Date();
        const startDate = new Date(date);
        return startDate > today;
    }


    return (
        <div className={styles.myBookings}>
            {
                successDel &&
                <div className={styles.notification}>ההזמנה בוטלה בהצלחה</div>
            }
            <div className={styles.logout} onClick={logout}>Logout</div>

            <div className={styles.tables}>
                <h2>ההזמנות של {customer.full_name} </h2>
                {bookings.map((item, index) => (
                    <div className={styles.deleteTable} key={index}>
                        {

                            isDateInFuture(item.start_date) &&
                            <>
                                <Popup trigger={
                                    <div className={styles.del}>בטל הזמנה</div>
                                }
                                    onOpen={() => setIdDel(item.booking_id)}
                                    position="right center">

                                    <div className={styles.sure}>
                                        ?  רוצה לבטל
                                        <div className={styles.sureDel}
                                            onClick={() => deleteBooking(IdDel)}
                                        >בטל הזמנה
                                        </div>
                                    </div>

                                </Popup>

                            </>
                        }
                        <table>
                            <thead>
                                <tr>
                                    <th>סה"כ לתשלום</th>
                                    <th>מחיר ללילה</th>
                                    <th>תאריך יציאה</th>
                                    <th>תאריך כניסה</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{(calculateDateDifference(item?.start_date, item?.end_date)) * item?.payment_amount}</td>
                                    <td>{item?.payment_amount}</td>
                                    <td>{item?.end_date?.split('T')[0]}</td>
                                    <td>{item?.start_date?.split('T')[0]}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                ))}

            </div>
        </div>
    );
}