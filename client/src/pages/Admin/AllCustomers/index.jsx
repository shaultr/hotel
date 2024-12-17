import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Customer from '../Customer';
import style from './style.module.css';
import Popup from 'reactjs-popup';
import { FaTrashAlt } from "react-icons/fa";


const AllCustomers = ({ customers, deleteBooking }) => {


    return (
        <>
            <table className={style.bookingTable}>
                <thead>
                    <tr>
                        <th>name </th>
                        <th>phone</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.customer_id}>
                            <td>{customer.full_name}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.email}</td>
                            {/* <td><Customer customer_id={booking.customer_id} />
                            </td> */}
                            {/* <Popup trigger={
                                <div className={style.delete}> {<FaTrashAlt />}</div>
                             } >
                              <h1></h1>
                            <div className={style.sure} onClick={() => deleteCustomer(booking.booking_id)}>Are you sure? </div>
                            </Popup> */}
                        </tr>

                    ))}
                </tbody>
            </table> 
        </>
    );
};
export default AllCustomers;