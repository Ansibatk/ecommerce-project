import { STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { errorResponse, successResponse } from "../constants/response.js";
import Product from "../models/productModel.js";
//@desc Create Product 
//@route POST /api/products
//@access Admin
export const createProduct=async(req,res)=>{
    try{
        const {name,description,price,category,stock}=req.body;
        const exists=await Product.findOne({name});
        if(exists){
            return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.PRODUCT_EXISTS);
        }
    const product=Product.create({
        name,
        description,
        price,
        category,
        stock,
    });
    return successResponse(res,STATUS.CREATED,product,MESSAGES.PRODUCT_CREATED);
}
    catch(error){
     return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR);
    }
}
//@desc Get All Products
//@route GET /api/products
//@access Public
export const getProducts=async(req,res)=>{
    try{
        const products=await Product.find({}).populate("category","name");
        return successResponse(res,STATUS.SUCCESS,products,MESSAGES.PRODUCT_LIST);
    }
    catch(error){
        return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR);
    }
};
//@desc Get Single Product By Id
//@route GET /api/products/:id
//@access Public
export const getProductById=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id).populate("category","name");
        if(!product){
            return errorResponse(res,STATUS.NOT_FOUND,MESSAGES.PRODUCT_NOT_FOUND);
        }
       return successResponse(res,STATUS.SUCCESS,product,MESSAGES.PRODUCT_FOUND);
    }
    catch(error){
        return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR);
    }
};
//@desc Update Product
//@route PUT /api/products/:id
//@access Admin
export const updateProduct=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id).populate("category","name");


    }
    catch(error){
        
    }
}
export const deleteProduct=async(req,res)=>{
    try{

    }
    catch(error){
        
    }
}
