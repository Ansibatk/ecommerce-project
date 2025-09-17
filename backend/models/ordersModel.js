const mongoose=require('mongoose')
const orderSchema=new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    shippingAddress:{
        type:String,
    },
    orderDate:{
        type:Date,
    },
    status:{
        type:String,
    },
    totalAmount:{
        type:Number,
    }
})
const Order=mongoose.model('Order',orderSchema)
module.exports=Order;