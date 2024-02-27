import styles from './style.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Bookings from './Booking';

export default function Admin() {
    useEffect(() => {
        if (localStorage.getItem('isAdmin') === null) {
            localStorage.setItem('isAdmin', false);
        }
    }, []);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [type, setType] = useState('');

    const [bookings, setBookings] = useState([]);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

    const getAllBookings = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/admin/getAllBookings');
            setBookings(data);
            console.log(data);
        } catch (err) {
            console.error('Error fetching bookings:', err);
        }
    };

    const getActiveBookings = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/admin/getActiveBookings');
            setBookings(data);
            console.log(data);
        } catch (err) {
            console.error('Error fetching bookings:', err);
        }
    };
    const getFinishedBookings = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/admin/getFinishedBookings');
            setBookings(data);
            console.log(data);
        } catch (err) {
            console.error('Error fetching bookings:', err);
        }
    };
    const getPendingBookings = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/admin/getPendingBookings');
            setBookings(data);
            console.log(data);
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

            const newArr = bookings.filter(booking => booking.booking_id !== bookingId);
            setBookings(newArr);
        }
        catch (err) {
        }
    }



    const handleSelect = (event) => {
        if (event.target.value === "all") {
            getAllBookings();
            setType('all')
        }
        else if (event.target.value === "active") {
            getActiveBookings()
        }
        else if (event.target.value === "finished") {
            getFinishedBookings()
            setType('finished')

        }
        else if (event.target.value === "pending") {
            getPendingBookings()
            setType('pending')
        }
    }


    const login = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/admin/loginAdmin/${name}/${email}`);
            console.log(response);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            localStorage.setItem('isAdmin', true);
            setIsAdmin(true);
        }
        catch (err) {
            setIsAuthorized(false);

        }
    };




    if (!isAdmin) {
        return (
            <div className={styles.login}>
                <input className={styles.input} onChange={(e) => { setName(e.target.value); setIsAuthorized(true) }} name='name' type='text' placeholder="שם מלא" />
                <input className={styles.input} onChange={(e) => { setEmail(e.target.value); setIsAuthorized(true) }} name='password' type="email" placeholder=" אימייל" />
                <div className={styles.go} onClick={login}>כנס</div>
                {!isAuthorized && <h3 style={{ color: "red" }}>! אינך מורשה</h3>}
            </div>
        );
    }


const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.setItem('isAdmin', 'false');
    window.location.reload();
}
    return (
        <div>

            <div className={styles.esc} onClick={logout}>Esc</div>
            {/* onChange={handleSelect} */}
            <select className={styles.select} onChange={handleSelect}>
                <option >Select</option>
                <option value="all">All Bookings</option>
                <option value="active">Active Bookings</option>
                <option value="finished">Finished Bookings</option>
                <option value="pending">Pending Bookings</option>
            </select>
            <div>
                {bookings.length > 0 && (
                    <>
                    <Bookings bookings={bookings} deleteBooking={deleteBooking} />
                    { 'The number of ' + type + ' bookings is: ' + bookings.length}
                    </>
                )}
            </div>
        </div>
    );
}