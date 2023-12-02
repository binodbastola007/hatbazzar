const mongoose = require('mongoose');
const { Schema } = mongoose;

const googleUserSchema = new Schema ({
    name:{type:String,required:true},
    email:{type:String,required:true},
    image:{type:String,required:true},
  })

const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);

module.exports=GoogleUser;