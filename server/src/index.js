const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user')
const connection = require('./db/connection')
const app = express();
const cors = require('cors');
const port = 4000;

app.use(cors());
app.use(express.json());


connection();


// const productSchema = new Schema({
//   productName: {type:String , required:true},
//   productDescription:{type:String , required:true},
//   productPrice : {type:Number , required:true},
//   productRating : {type:Number , required:true}
// })
// const ProductCard = mongoose.model('ProductCard',productSchema); 


app.post('/register',async(req,res)=>{
    const data = await User.create(req.body);
    if(data){
      res.json({msg:"Registered sucessfully"})
     }
     else{
      res.json({msg:"Couldn't register the user.please try registering again"})
     }
})
app.get('/users',async(req,res)=>{
  const data = await User.find();
  if(data.length>0){
    res.json({data});
   }
   else{
    res.json({msg:"No users found"})
   }
})



// app.post('/products/add',async(req,res)=>{
//     const data = ProductCard.create(req.body);
//     if(data){
//       res.json({msg:"Product sucessfully added in the listing"})
//      }
//      else{
//       res.json({msg:"Couldn't add the product.please try adding again"})
//      }
// })
// app.get('/products/all',async(req,res)=>{
//     const data = await ProductCard.find();
//     if(data.length>0){
//       res.json({data});
//      }
//      else{
//       res.json({msg:"No products found"})
//      }
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})