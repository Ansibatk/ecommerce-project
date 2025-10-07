import mongoose from "mongoose";
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
 description:{
        type:String,
        trim: true
    },
 price:{
        type:Number,
        required: true,
        min: 0
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
  stock:{
        type:Number,
        required: true,
        min: 0
    },
  },
{timestamps:true}
);
const Product=mongoose.model('Product',productSchema);
export default Product;