const User = require('../models/user');
const GoogleUser = require('../models/googleuser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/register',async(req,res)=>{
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
   
   router.post('/login',async (req,res)=>{
     const userDetails = await User.findOne({phoneNumber: req.body.phoneNumber})
     if(!userDetails){
       res.json({msg :'Invalid Credentials'})
     }else{
       const isMatched = await bcrypt.compare( req.body.password,userDetails.password )
       // generate token for the users
       var token = jwt.sign({phoneNumber:req.body.phoneNumber}, process.env.SECRET_KEY);
       if(isMatched){
         res.json({msg :'Login Success',token})
       }else{
         res.json({msg :'Incorrect password'})
       }
     }
   
   })

   router.post('/register-googleuser',async(req,res)=>{
    try{
     const userExists = await GoogleUser.findOne({email:req.body.email});
     if(userExists){
       res.status(409).json({msg:"Already Signed up, please login !"})
     }
     else{
       const data = await GoogleUser.create(req.body);
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
   
   router.post('/login-googleuser',async (req,res)=>{
     const userDetails = await GoogleUser.findOne({email: req.body.email})
     if(!userDetails){
       res.json({msg :'No user found with this email, please try signing up and logging in again !'})
     }else{
         res.json({msg :'Login Success',userDetails})
       }
     }
   )

module.exports=router;