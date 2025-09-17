const mongoose=require('mongoose')
const cartModel=new mongoose.Schema({
    id:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    date:{
        type:Date,
    }
})
const Cart=mongoose.model('Cart',cartModel)
module.exports=Cart;