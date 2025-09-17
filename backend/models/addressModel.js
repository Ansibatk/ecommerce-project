import mongoose from "mongoose";
const addressSchema=new mongoose.Schema({
    id:{
        type:String,
    },
    type:{
        type:String,
        required: true,
        trim: true
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
 }
},
{
    timestamps:true
});
    const Address=mongoose.model('Address',addressSchema)
   export default Address;