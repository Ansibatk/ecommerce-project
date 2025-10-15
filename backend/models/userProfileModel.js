import mongoose from "mongoose";

const profileSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    phone:{
        type:Number,
        required:true,
    },
    dob:{
        type:Date,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female","other"]//optional validation
    }
    },
    {
        timestamps:true
    });
    const Profile=mongoose.model('Profile',profileSchema)
    export default Profile;