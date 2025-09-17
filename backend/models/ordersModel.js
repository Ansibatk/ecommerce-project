import mongoose from "mongoose";
const orderSchema=new mongoose.Schema({
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart',
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    shippingAddress:{
       street:
            { type: String, required: true },
        city:
             { type: String, required: true },
        state: 
             { type: String, required: true },
        country: 
            { type: String, required: true },
        pincode: 
            { type: Number, required: true }
    },
    orderDate:{
        type:Date,
        default: Date.now
    },
    status:{
        type:String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    totalAmount:{
        type:Number,
        required: true,
        min: 0
    }
},
    { timestamps: true });

const Order=mongoose.model('Order',orderSchema)
export default Order;