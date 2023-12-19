const express = require('express');
const router = express.Router();
const { saveOrder, addCheckoutDetails, getOrderForPayment } = require('../controllers/order');

router.post('/save-order', saveOrder);

router.put('/add-checkout-details/:id', addCheckoutDetails)

module.exports = router;