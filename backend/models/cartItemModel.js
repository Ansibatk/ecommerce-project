const mongoose=require('mongoose')
const cartItemSchema=new mongoose.Schema({
    id:{
        type:String,
    },
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    quantity:{
        type:Number,
    },
    Date:{
        type:Date,
    }
})
const CartItem=mongoose.model('CartItem',cartItemSchema)
module.exports=CartItem;