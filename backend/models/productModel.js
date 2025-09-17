const mongoose=require('mongoose')
const Category = require('./categoryModel')
const productSchema=new mongoose.Schema({
    id:{
        type:String,
    },
    name:{
        type:String,
    },
    CategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    price:{
        type:Number,
    },
    stock:{
        type:String,
    },
    description:{
        type:String,
    }
})
const Product=mongoose.model('Product',productSchema);
module.exports=Product;