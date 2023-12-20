const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    fullName:String,
    phoneNumber:String,
    province:String,
    district:String,
    city:String,
    street:String,
    userId:String,
    orderItems:[{type:Object,required:true}]
  })
const Order = mongoose.model('Order',orderSchema); 
  

module.exports=Order;