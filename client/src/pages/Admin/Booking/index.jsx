import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Customer from '../Customer';
import style from './style.module.css';
import Popup from 'reactjs-popup';
import { FaTrashAlt } from "react-icons/fa";


const Bookings = ({ bookings, deleteBooking }) => {

    const [sureDelete, setSureDelete] = useState(false)

    return (
        <>
            <table className={style.bookingTable}>
                <thead>
                    <tr>
                        <th>Payment Amount</th>
                        <th>Room ID</th>
                        <th>Booking ID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Customer id</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.booking_id}>
                            {/* <td>dfjdkfdjfkjdf</td> */}
                            <td>{booking.payment_amount}</td>
                            <td>{booking.room_id}</td>
                            <td>{booking.booking_id}</td>
                            <td>{format(new Date(booking.start_date), 'dd-MM-yyyy')}</td>
                            <td>{format(new Date(booking.end_date), 'dd-MM-yyyy')}</td>
                            <td>{booking.customer_id}</td>
                            <td><Customer customer_id={booking.customer_id} />
                            </td>
                            <Popup trigger={
                                <div className={style.delete}> {<FaTrashAlt />}</div>
                             } >
                            <div className={style.sure} onClick={() => deleteBooking(booking.booking_id)}>Are you sure? </div>
                            </Popup>
                        </tr>

                    ))}
                </tbody>
            </table>
        </>
    );
};
export default Bookings;