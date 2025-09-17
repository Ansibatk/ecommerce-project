import mongoose from "mongoose";
const OrderItemSchema=new mongoose.Schema({
    id:{
        type:String,
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required: true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required: true
    },
    quantity:{
        type:Number,
        required: true,
        min: 1,
        default: 1
    },
    price:{
        type:Number,
        required: true,
        min: 0
    }
},
 { timestamps: true }
);
const OrderItem=mongoose.model('OrderItem',OrderItemSchema)
export default OrderItem;