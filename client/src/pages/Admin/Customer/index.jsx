import React from 'react'
import axios from 'axios';
import { useState } from 'react';

export default function Customer({ customer_id }) {
  const [customerObj, setCustomerObj] = useState();



  const customerDetails = async () => {
    console.log('customer:', customer_id);
    
    if (!customerObj) {
      try {
        const cust = await axios.get(`http://localhost:8000/admin/getCustomer/${customer_id}`);
        setCustomerObj(cust.data);
        console.log('eee.... ',cust);
      } catch (err) {
        console.error('Error fetching customer details:', err);
      }
    } else {
      setCustomerObj();
    }

  };
  return (
    <div>
      <button onClick={() => customerDetails()}>Customer Details</button>
      <div>
        {customerObj && 
        <>
          <div>
            {'name: | '}
            {customerObj.full_name}
          </div>
          <div>
            {'phone: | '}
            {customerObj.phone}
          </div>
          <div>
            {'address: | '}
            {customerObj.address}
          </div>
          <div>
            {'email: | '}
            {customerObj.email}
          </div>
        </>
        
        }
      </div>
    </div >
  )
}