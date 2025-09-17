const mongoose=require('mongoose')
const OrderItemSchema=new mongoose.Schema({
    id:{
        type:String,
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    quantity:{
        type:Int16Array,
    },
    price:{
        type:Number,
    }
})
const OrderItem=mongoose.model('OrderItem',OrderItemSchema)
module.exports=OrderItem;