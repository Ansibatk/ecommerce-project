import mongoose from "mongoose";

const profileSchema=new mongoose.Schema({
    id:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    phone:{
        type:Number,
    },
    dob:{
        type:Date,
    },
    gender:{
        type:String,
        enum:["male","female","other"]//optional validation
    }
    },
    {
        timestamps:true
    });
    const Profile=mongoose.model('Profile',profileSchema)
    export default Profile;