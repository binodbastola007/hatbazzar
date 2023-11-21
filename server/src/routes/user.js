const User = require('../models/user');
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
       console.log(isMatched)
       if(isMatched){
         res.json({msg :'Login Success'})
       }else{
         res.json({msg :'Incorrect password'})
       }
     }
   
   })

module.exports=router;