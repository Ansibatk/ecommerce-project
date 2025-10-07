import { STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { errorResponse, successResponse } from "../constants/response.js";
import Profile from "../models/userProfileModel.js";
//@desc Create user profile
//@route POST /api/userProfile/:userId
//@ access user/admin
export const createUserProfiles=async(req,res)=>{
    try{
        const {userId}=req.params.userId;
        const {phone,dob,gender}=req.body;
        const user=await userId.CreateOne(
            phone,
            dob,
            gender,
        )
        if(!user){
            return errorResponse(res,STATUS.NOT_FOUND,MESSAGES.USER_NOT_FOUND);
        }
        return successResponse(res,STATUS.OK,MESSAGES.PROFILE_CREATED,data)
    }
    catch(error){
        return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR);
    }
}
//@desc get all user profile
//@route GET /api/userProfile/:userId
//@access Admin
export const getAllUserProfile=async(req,res)=>{
    try{

    }
    catch(error){

    }
}
//@desc get one user profile
//@route GET /api/userProfile/:userId
//@access Admin
export const getOneUserProfile=async(req,res)=>{
    try{

    }
    catch(error){

    }
}
//@desc Update user profile
//@route PUT /api/userProfile/:userId
//@access Admin
export const updateUserProfile=async(req,res)=>{
    try{

    }
    catch(error){

    }
}
//@desc Delete user profile
//@route DELETE /api/userProfile/:userId
//@access Admin
export const deleteUserProfile=async(req,res)=>{
    try{

    }
    catch(error){

    }
}
