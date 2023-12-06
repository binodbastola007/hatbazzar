const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    fullName:String,
    phoneNumber:String,
    province:String,
    district:String,
    city:String,
    street:String,
    orderItems:[{type:Object,required:true}]
  })
const Order = mongoose.model('order',orderSchema); 
  

module.exports=Order;