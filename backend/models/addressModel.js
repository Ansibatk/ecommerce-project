import mongoose, { Schema } from "mongoose";
import {MESSAGES} from "../constants/messages.js";
const addressSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    type:{
        type:String,
        required: true,
        trim: true,
        enum: ["home", "office"], // only allow these two values
    },
    street:{
        type:String,
        required: true,
        trim: true
    },
    city:{
        type:String,
        required: true,
        trim: true
    },
    state:{
        type:String,
        required: true,
        trim: true
    },
    country:{
        type:String,
        required: true,
        trim: true
    },
    pincode:{
        type:Number,
        required:true,
         validate: {
      validator: function(v) {
        return /^\d{6}$/.test(v); // 6-digit numeric pincode
      },
      message: MESSAGES.ADDRESS.INVALID_PINCODE // use your predefined message
    }
 }
},
{
    timestamps:true
});
    const Address=mongoose.model('Address',addressSchema)
   export default Address;