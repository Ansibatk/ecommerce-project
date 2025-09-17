import mongoose from "mongoose";
const paymentSchema=new mongoose.Schema({
    id:{
        type:String,
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required: true
    },
    paymentMethod:{
        type:String,
         enum: ["card", "upi", "netbanking", "cod"],
        required: true
    },
    status:{
        type:String,
        enum: ["pending", "success", "failed", "refunded"],
        default: "pending"
    },
    amount:{
        type:Number,
        required: true,
        min: 0
    },
    paymentDate:{
        type:Date,
        default: Date.now
    },
    transactionId:{
        type:String,
        unique: true,
        sparse: true // allows null but ensures uniqueness when present
    }
},
 { timestamps: true }
)
const Payment=mongoose.model('Payment',paymentSchema)
export default Payment;