import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import dotenv from"dotenv";
import { errorResponse, successResponse } from "../constants/response.js";
import { STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import generateToken from "../utils/generateToken.js";
dotenv.config();
//@desc Register new user
//@route POST/api/users/register
//@access Public
export const registerUser=async(req,res)=>{
    try{
        const username=req.body.username;
        const email=req.body.email;
        const password=req.body.password;
        const role=req.body.role;
       //validations
      if(!username||!password||!email||!role){
         return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.ALL_FIELDS_REQUIRED);
       
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) 
      {
      return errorResponse(res, STATUS.BAD_REQUEST, MESSAGES.EMAIL_EXISTS);
    }
    //convert password to hashed format for protection
   const hashedPassword=await bcrypt.hash(password,10)
   //creating user
   const user=await User.create({
    username,
    email,
    password:hashedPassword,
    role
});
return successResponse(res,STATUS.CREATED,MESSAGES.USER_REGISTERED,user)
// res.status(201).json({message:"user created successfully"})
}
catch(error){
   console.error(error);
   return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR)
  //  res.status(500).json({message:"server error"})
}
};
//@desc Login user
//@route POST/api/users/login
//@access Public
export const loginUser=async(req,res)=>{
    try{
        const{email,password,}=req.body;
    //find user
    const user=await User.findOne({email});
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
       {
          _id:user._id,
          name:user.name,
          email:user.email,
          role:user.role,
          token,
       },
        MESSAGES.LOGIN_SUCCESS
      );
      
  } catch (error) {
    console.error("Login error:", error);
     return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR)
  }}
  //@desc Get user
  //@route GET/api/users/getUser
  //@route Admin
  export const getUser=async(req,res)=>{
      try{
      const users=await User.find({})
      return successResponse(res,STATUS.OK,users,MESSAGES.USER_FETCHED)
    }
 catch(error){
      console.error(error)
 return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR)
    }
    }
//@desc Get User By Id
//@route GET/api/users/:id
//@access Admin
export const getUserById=async(req,res)=>{
  try{
    const user=await User.findById(req.params.id)
     if(!user){
    return errorResponse(res,STATUS.NOT_FOUND,MESSAGES.NOT_FOUND)
  }
    return successResponse(res,STATUS.OK,user,MESSAGES.USER_FETCHED)
  }
  catch(error){
    console.error(error)
    return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR)
  }
}

//@desc Update user
//@route PUT/api/users/:id
//@access Admin/User
export const updateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password; // TODO: hash if changed
      user.role = role || user.role;
      const updatedUser = await user.save();
      return successResponse(res, STATUS.OK, updatedUser, MESSAGES.USER_UPDATED);
    } else {
      return errorResponse(res, STATUS.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
    }
  } catch (error) {
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR, error.message);
  }
};
//@desc Delete user
//@route DELETE/api/users/:id
//@access Public
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      return successResponse(res, STATUS.SUCCESS, null, MESSAGES.USER_DELETED);
    } else {
      return errorResponse(res, STATUS.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
    }
  } catch (error) {
    return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR, error.message);
  }
};

  


