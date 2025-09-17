import mongoose from "mongoose";
const categorySchema=new mongoose.Schema({
    id:{
        type:String,
    },
    name:{
        type:String,
        required: true,
        trim: true
    },
    description:{
        type:String,
        trim: true
    },
    products:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
        }
    ]
},
{timestamps:true}
);
const Category=mongoose.model('Category',categorySchema)
export default Category;