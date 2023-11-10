const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    productName : {type:String , required:true},
    price:{type:Number , required:true},
    rating : {type:Number , required:true},
    category : {type:String , required:true},
    colors: [{type:String,required:true}],
    currency : {type:String , required:true},
    description: {type:String , required:true},
  })
const ProductCard = mongoose.model('ProductCard',productSchema); 
  

module.exports=ProductCard;