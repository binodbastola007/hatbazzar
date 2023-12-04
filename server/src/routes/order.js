const Order = require('../models/order');
const express = require('express');
const router = express.Router();

router.post('/save-order', async (req, res) => {
    try {
      const data = await Order.create({orderItems:req.body});
      if (data) {
        res.json({ msg: "Sucessfully saved your cart/order", orderId:data._id})
      }
      else {
        res.json({ msg: "Couldn't create your order" })
      }
    }
    catch (err) {
      console.log(err);
    }
  
  })

  module.exports = router;