import { STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { errorResponse, successResponse } from "../constants/response.js";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import validator from "validator";
import jwt from"jsonwebtoken";
//@desc Login user
//@route POST/api/user/login
//@access Public
export const loginUser=async(req,res)=>{
    try{
        const{email,password,}=req.body;
    //find user
    const user=await userModel.findOne({email});
    if(!user){
        return errorResponse(res,STATUS.UNAUTHORIZED,MESSAGES.INVALID_CREDENTIALS)
    }
    //Check password
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
       return errorResponse(res,STATUS.UNAUTHORIZED,MESSAGES.INVALID_CREDENTIALS) 
    }
    // Use utility to generate token
    const token = generateToken(user._id,user.role)

   return successResponse(
       res,
       STATUS.OK,
       MESSAGES.LOGIN_SUCCESS,
        {
          _id:user._id,
          name:user.name,
          email:user.email,
          role:user.role,
          token,
       },
      );
      
  } catch (error) {
    console.error("Login error:", error);
     return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR)
  }}

//Route for user register
export const registerUser=async(req,res)=>{

  try{
 
    const {name,email,password}=req.body;
       
       //validations
      if(!name||!password||!email){
         return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.ALL_FIELDS_REQUIRED);
       
    }

    //checking user already exists or not
   const existingUser = await userModel.findOne({ email });
    if (existingUser) 
      {
      return errorResponse(res, STATUS.BAD_REQUEST, MESSAGES.EMAIL_EXISTS);
    }

    //validating email format & strong password
    if(!validator.isEmail(email)){
      return errorResponse(res, STATUS.BAD_REQUEST, MESSAGES.EMAIL_NOT_VALID);
    }
    if(password.length<8){
       return errorResponse(res, STATUS.BAD_REQUEST, MESSAGES.NOT_STRONG_PASSWORD);
    }
    //hashing user password
    const salt=await bcrypt.genSalt(10)
     const hashedPassword=await bcrypt.hash(password,salt)
   //creating user
   const user=await userModel.create({
    name,
    email,
    password:hashedPassword,
    role:"user"
});


 // Use utility to generate token
    const token = generateToken(user._id,user.role)

   return successResponse(
       res,
       STATUS.CREATED,
       MESSAGES.USER_REGISTERED,
         {
          _id:user._id,
          name:user.name,
          email:user.email,
          role:user.role,
          token,
       },
      );

}
  
  catch(error){
     console.error(error);
   return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR)
  }
}
//Route for admin login
export const adminLogin=async(req,res)=>{
  try{

    const{email,password}=req.body;

    if(email === process.env.ADMIN_EMAIL && password ===process.env.ADMIN_PASSWORD){
      const token=jwt.sign(email+password,process.env.JWT_SECRET);
      return successResponse(res,STATUS.OK,MESSAGES.LOGIN_SUCCESS,token)
    }
    else{
      return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.INVALID_CREDENTIALS)
    }
  }
  catch(error){
    console.log(error);
    return successResponse(res,STATUS.BAD_REQUEST,MESSAGES.SERVER_ERROR)
    
  }
}
