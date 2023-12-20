const express = require('express');
const router = express.Router();
const { getOrderForPayment } = require('../controllers/order');
const {verifyPayment, createPayment} = require('../controllers/esewa');


router.post('/verify-payment',verifyPayment,getOrderForPayment,createPayment);

module.exports =router;
