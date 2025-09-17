const { default: mongoose } = require("mongoose");

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
    },
    })
    const Profile=mongoose.model('Profile',profileSchema)
    module.exports=Profile;