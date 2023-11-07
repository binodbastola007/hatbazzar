const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema ({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    phoneNumber:{type:Number,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    confirmPassword:{type:String,required:true}
  })

const User = mongoose.model('User',userSchema);

module.exports=User;