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
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [type, setType] = useState('');
    const [bookings, setBookings] = useState([]);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
    const [file, setFile] = useState(null);
    const [roomId, setRoomId] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('roomId', roomId);

        try {
            const response = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Upload success:', response.data);
            if(response.status===200){
                setSuccess(true)
            }
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

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
        else if (event.target.value === "addAPicture") {
            setType('addAPicture')
        }
    }

    const login = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/customer/login/${email}/${password}`);
            if (response.data.customer.is_admin === 1) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('isAdmin', true);
                setIsAdmin(true);
                setIsAuthorized(true);
            }
            else {
                setIsAuthorized(false);
            }
        }
        catch (err) {
            setIsAuthorized(false);
        }
    };


    if (!isAdmin) {
        return (
            <div className={styles.login}>
                <h2>Admin login</h2>
                <input className={styles.input} onChange={(e) => { setEmail(e.target.value); setIsAuthorized(true) }} name='password' type="email" placeholder="email" />
                <input className={styles.input} onChange={(e) => { setPassword(e.target.value); setIsAuthorized(true) }} name='name' type='password' placeholder="password" />
                <div className={styles.go} onClick={login}>כנס</div>
                {!isAuthorized && <h3 style={{ color: "red" }}>! אינך מורשה</h3>}
            </div>
        );
    }


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.setItem('isAdmin', 'false');
        window.location.reload();
    }
    return (
        <div>

            <div className={styles.logout} onClick={logout}>Logout</div>

            <select className={styles.select} onChange={handleSelect}>
                <option >Select</option>
                <option value="all">All Bookings</option>
                <option value="active">Active Bookings</option>
                <option value="finished">Finished Bookings</option>
                <option value="pending">Pending Bookings</option>
                <option value="addAPicture">Add a picture</option>
            </select>
            <div>
                {(bookings.length > 0 && type !== 'addAPicture') && (
                    <>
                        <Bookings bookings={bookings} deleteBooking={deleteBooking} />
                        {'The number of ' + type + ' bookings is: ' + bookings.length}
                    </>
                )}
                {type === 'addAPicture' &&
                    <form className={styles.picture} onSubmit={handleSubmit}>
                        <input type='file' onChange={(e) => setFile(e.target.files[0])} />
                        <input
                            type='text'
                            placeholder='room id'
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                        />
                        <input type='submit' />
                    </form>
                }
                {success && <h2>Succsess </h2>}
            </div>

        </div>
    );
}