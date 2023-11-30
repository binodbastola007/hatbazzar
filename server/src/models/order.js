const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderItems:[{type:Object,required:true}]
  })
const Order = mongoose.model('order',orderSchema); 
  

module.exports=Order;