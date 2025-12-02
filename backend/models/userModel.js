import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type:String,
        required: true,
        minlength: 6
    },
    cartData:{
        type:Object,
        default:{}
    },
   

    role:{
        type:String,
        enum: ['user', 'admin'], // optional
        default: 'user'
    },
      // forgot password
  resetPasswordToken:{
                  type:String,
                  default:null
        }, 
  resetPasswordExpire:{
                type:Date,
                default:null
  } 
},
    { timestamps:true,
      minimize:false}
);
const userModel=mongoose.models.user || mongoose.model('user',userSchema)
export default userModel;