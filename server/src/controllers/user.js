const {User, GoogleUser} = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const registerUser = async(req,res)=>{
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
       
   }

   const loginUser = async (req,res)=>{
    const userDetails = await User.findOne({phoneNumber: req.body.phoneNumber}).lean();
    console.log(userDetails);
    const {password,...loginDetails} = userDetails;
    if(!userDetails){
      res.json({msg :'Invalid Credentials'})
    }else{
      const isMatched = await bcrypt.compare( req.body.password,userDetails.password )
      // generate token for the users
      var token = jwt.sign({phoneNumber:req.body.phoneNumber}, process.env.SECRET_KEY);
      if(isMatched){
        res.json({msg :'Login Success',token , loginDetails})
      }else{
        res.json({msg :'Incorrect password'})
      }
    }
  
  }

  const registerGoogleUser = async(req,res)=>{
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
       
   }

   const loginGoogleUser = async (req,res)=>{
    const userDetails = await GoogleUser.findOne({email: req.body.email})
    if(!userDetails){
      res.json({msg :'No user found with this email, please try signing up and logging in again !'})
    }else{
        res.json({msg :'Login Success',userDetails})
      }
    }


    module.exports = {registerUser, loginUser, registerGoogleUser, loginGoogleUser};

