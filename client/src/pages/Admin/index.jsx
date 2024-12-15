import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './style.module.css'; // assuming you have this stylesheet
import Bookings from './Booking';
import AllCustomers from './AllCustomers';

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
  const [customers, setCustomers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
  const [file, setFile] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [success, setSuccess] = useState(false);
  const [activeButton, setActiveButton] = useState('');
  const [roomsIds, setRoomsIds] = useState([1,2]);
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('roomId', roomId);
    try {
      const response = await axios.post('http://localhost:8000/images/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload success:', response);
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const getAllBookings = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/admin/getAllBookings');
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };
  const getRoomsId = async () => {
    
    try {
        const { data } = await axios.get('http://localhost:8000/rooms/roomIds');
      console.log('gg',data);
      setRoomsIds(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };
  getRoomsId()
  const getActiveBookings = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/admin/getActiveBookings');
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const getFinishedBookings = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/admin/getFinishedBookings');
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const getPendingBookings = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/admin/getPendingBookings');
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };
  const getAllCustomers = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/admin/getAllCustomers');
      setCustomers(data);
      console.log(customers);

    } catch (err) {
      console.error('Error fetching customers:', err);
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
          authorization: `Bearer ${token}`,
        },
      });

      const newArr = bookings.filter((booking) => booking.booking_id !== bookingId);
      setBookings(newArr);
    } catch (err) {
      console.error('Error deleting booking:', err);
    }
  };

  const handleButtonClick = (selectedType, action) => {
    setActiveButton(selectedType);
    setType(selectedType);
    action();
  };

  const login = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/customer/login/${email}/${password}`);
      if (response.data.customer.is_admin === 1) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isAdmin', true);
        setIsAdmin(true);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (err) {
      setIsAuthorized(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className={styles.login}>
        <h2>Admin login</h2>
        <input
          className={styles.input}
          onChange={(e) => {
            setEmail(e.target.value);
            setIsAuthorized(true);
          }}
          name='email'
          type='email'
          placeholder='email'
        />
        <input
          className={styles.input}
          onChange={(e) => {
            setPassword(e.target.value);
            setIsAuthorized(true);
          }}
          name='password'
          type='password'
          placeholder='password'
        />
        <div className={styles.go} onClick={login}>
          כנס
        </div>
        {!isAuthorized && <h3 style={{ color: 'red' }}>! אינך מורשה</h3>}
      </div>
    );
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('isAdmin', 'false');
    window.location.reload();
  };

  return (
    <div>
      <div className={styles.logout} onClick={logout}>
        Logout
      </div>


      <div className={styles.buttonContainer}>
        <button
          className={activeButton === 'all' ? styles.activeButton : ''}
          onClick={() => handleButtonClick('all', getAllBookings)}
        >
          All Bookings
        </button>
        <button
          className={activeButton === 'active' ? styles.activeButton : ''}
          onClick={() => handleButtonClick('active', getActiveBookings)}
        >
          Active Bookings
        </button>
        <button
          className={activeButton === 'finished' ? styles.activeButton : ''}
          onClick={() => handleButtonClick('finished', getFinishedBookings)}
        >
          Finished Bookings
        </button>
        <button
          className={activeButton === 'pending' ? styles.activeButton : ''}
          onClick={() => handleButtonClick('pending', getPendingBookings)}
        >
          Future Bookings
        </button>
        <button
          className={activeButton === 'getAllCustomers' ? styles.activeButton : ''}
          onClick={() => handleButtonClick('getAllCustomers', getAllCustomers)}
        >
          all customers
        </button>
        <button
          className={activeButton === 'addAPicture' ? styles.activeButton : ''}
          onClick={() => handleButtonClick('addAPicture', () => setType('addAPicture'))}
        >
          Add a Picture
        </button>
      </div>

      <div>
        {type === '' && <h2>Welcome, Admin! Please select an action to proceed</h2>}
        {bookings.length > 0 && type !== 'addAPicture' && type !== 'getAllCustomers' ? (
          <>
            <Bookings bookings={bookings} deleteBooking={deleteBooking} />
            {'The number of ' + type + ' bookings is: ' + bookings.length}
          </>
        ) : (
          type !== 'addAPicture' && type !== '' && type !== 'getAllCustomers' && <h2>There are no bookings</h2>
        )}

        {type === 'getAllCustomers' && (
          <>
            <AllCustomers customers={customers} />
          </>
        )}
        {type === 'addAPicture' && (
          <form className={styles.picture} onSubmit={handleSubmit}>
            <input type='file' onChange={(e) => setFile(e.target.files[0])} />
            <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
              <option value="" disabled>
                Select a room
              </option>
              {roomsIds.map((room, index) => (
                <option key={index} value={room}>
                  {room}
                </option>
              ))}
            </select>
            <input type='submit' />
          </form>
        )}
        {success && (
          <div className={styles.notification}>
            {`The image has been successfully added to room ${roomId}`}
          </div>
        )}
      </div>
    </div>
  );
}
