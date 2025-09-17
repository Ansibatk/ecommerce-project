const mongoose=require('mongoose')
const paymentSchema=new mongoose.Schema({
    id:{
        type:String,
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    },
    paymentMethod:{
        type:String,
    },
    status:{
        type:String,
    },
    amount:{
        type:Number,
    },
    paymentDate:{
        type:Date,
    },
    transactionId:{
        type:String,
    }
})
const Payment=mongoose.model('Payment',paymentSchema)
module.exports=Payment;