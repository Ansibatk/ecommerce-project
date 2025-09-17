const mongoose=require('mongoose')
const categorySchema=new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    name:{
        type:String,
    },
    description:{
        type:String,
    }
})
const Category=mongoose.model('Category',categorySchema)
module.exports=Category;