import style from './style.module.css';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51QWzYoQuUfSi0OqMjP5B3pWi3beNR56TrKHY2P0GyOyg6NNoZ6b6rsiCFKvbwg5htB1mHaAZfZWq5qXno3mxHHY7002hxRCEkq');

export default function CreditForm({ onSubmitBooking, availability, payment }) {
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [stripe, setStripe] = useState(null);
  const [elements, setElements] = useState(null);
  const [cardElement, setCardElement] = useState(null);

  useEffect(() => {
    const setupStripe = async () => {
      const stripeInstance = await stripePromise;
      setStripe(stripeInstance);

      const elementsInstance = stripeInstance.elements();
      setElements(elementsInstance);

      const card = elementsInstance.create('card', {
        style: {
          base: {
            fontSize: '18px',
            color: '#424770',
            letterSpacing: '0.025em',
            fontFamily: 'Arial, sans-serif',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
      });
      card.mount('#card-element');
      setCardElement(card);
    };

    setupStripe();
  }, []);

  const handlePayment = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setCardError('');
    setSuccess(false);

    if (!stripe || !elements) {
      setCardError('Stripe עדיין לא נטען');
      setProcessing(false);
      return;
    }

    try {
      const { token, error } = await stripe.createToken(cardElement);
      if (error) {
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      const response = await axios.post('http://localhost:8000/create-payment/', {
        amount: payment * 100,
        token: token.id,
      });

      if (response.data.success) {
        setSuccess(true);
        onSubmitBooking();
      } else {
        setCardError('שגיאה בתשלום: ' + response.data.error);
      }
    } catch (err) {
      setCardError('שגיאה בחיבור לשרת: ' + err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={style.formbooking}>
      <h2>תשלום באמצעות כרטיס אשראי</h2>
      <form onSubmit={handlePayment}>
        <div id="card-element" style={{ marginBottom: '20px' }}></div>
        {cardError && <div style={{ color: 'red' }}>{cardError}</div>}
        {success && availability && <div style={{ color: 'green' }}>!התשלום הצליח </div>}

        {availability && (
          <button type="submit" disabled={processing}>
            {processing ? 'מעבד...' : 'שלם עכשיו'}
          </button>
        )}
      </form>

      {!availability && <div style={{ color: 'red' }}>החדר המבוקש לא זמין. יש לבחור תאריך אחר.</div>}
    </div>
  );
}
