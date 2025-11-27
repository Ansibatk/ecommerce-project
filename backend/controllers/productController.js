import { STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { errorResponse, successResponse } from "../constants/response.js";
import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js";

//Function for add product
export const addProduct =async(req,res)=>{
    try{
        const{name,description,price,category,subCategory,sizes,bestseller}=req.body;

        const image1=req.files.image1 && req.files.image1[0]
        const image2=req.files.image2 && req.files.image2[0]
        const image3=req.files.image3 && req.files.image3[0]
        const image4=req.files.image4 && req.files.image4[0]

        const images=[image1,image2,image3,image4].filter((item)=>item !==undefined)

        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )

        const productData={
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestseller:bestseller === "true" ? true :false,
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date:Date.now()
        }
console.log(productData);

const product=new productModel(productData);
await product.save()
        
return successResponse(res,STATUS.SUCCESS,MESSAGES.PRODUCT.PRODUCT_CREATED)
    }
    catch(error){
        console.log(error);
        return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.SERVER_ERROR)
        
    }
}
//Function for list product
export const listProducts =async(req,res)=>{
    try{
        const products=await productModel.find({});
        return successResponse(res,STATUS.OK,MESSAGES.PRODUCT.PRODUCT_LIST,products)
    }
    catch(error){
        console.log(error);
        return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.PRODUCT.PRODUCT_NOT_FOUND)
        
    }
}
//Function for remove product
export const removeProduct =async(req,res)=>{
    try{

        await productModel.findByIdAndDelete(req.body._id)
        return successResponse(res,STATUS.OK,MESSAGES.PRODUCT.PRODUCT_REMOVED)
    }
    catch(error){

        console.log(error);
        return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.PRODUCT.PRODUCT_NOT_FOUND)
    }
}
//Function for single product info
export const singleProduct =async(req,res)=>{
    try{
       
        const{productId}=req.body;
        const product=await productModel.findById(productId)
        return successResponse(res,STATUS.OK,MESSAGES.PRODUCT.PRODUCT_FOUND,product)
    }
    catch(error){
        console.log(error);
        return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.PRODUCT.PRODUCT_NOT_FOUND)
    }
}