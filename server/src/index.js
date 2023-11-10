const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const ProductCard = require('./models/products')
const connection = require('./db/connection')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
const cors = require('cors');
const port = 4000;

app.use(cors());
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));


connection();


app.post('/register',async(req,res)=>{
 try{
  const userExists = await User.findOne({phoneNumber:req.body.phoneNumber});
  if(userExists){
    res.status(409).json({msg:"Phone number already taken"})
  }
  else{
    const hashPassword = await bcrypt.hash(req.body.password,saltRounds);
    req.body.password = hashPassword;
    const data = await User.create(req.body);

    if(data){
      res.json({msg:"Registered sucessfully"})
     }
     else{
      res.json({msg:"Couldn't register the user.please try registering again"})
     }
  }
 }
 catch(err){
  console.log(err);
 }
    
})

app.post('/login',async (req,res)=>{
  const userDetails = await User.findOne({phoneNumber: req.body.phoneNumber})
  if(!userDetails){
    res.json({msg :'Invalid Credentials'})
  }else{
    const isMatched = await bcrypt.compare( req.body.password,userDetails.password )
    console.log(isMatched)
    if(isMatched){
      res.json({msg :'Login Success'})
    }else{
      res.json({msg :'Incorrect password'})
    }
  }

})


app.post('/products/add',async(req,res)=>{
   const product={
    productName:req.body.productname,
    price:req.body.price,
    rating:req.body.rate,
    category:req.body.select,
    colors:req.body['select-multiple'],
    currency:req.body.suffix,
    description:req.body.intro
   }
   try{
    
    const data = await ProductCard.create(product);
    if(data){
      res.json({msg:"Product sucessfully added in the listing"})
     }
     else{
      res.json({msg:"Couldn't add the product.please try adding again"})
     }
   }
   catch(err){
    console.log(err);
   }

})
app.get('/products/all',async(req,res)=>{
    const data = await ProductCard.find();
    if(data.length>0){
      res.json({data});
     }
     else{
      res.json({msg:"No products found"})
     }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})