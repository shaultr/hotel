const express = require('express');
const router = express.Router();
require("dotenv").config({ path: '../.env' });
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
  try {
    const { amount, token } = req.body;

    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'ils',
      source: token,
      description: 'תשלום עבור הזמנת חדר במלון'
    });

    res.status(200).json({ success: true, charge });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
