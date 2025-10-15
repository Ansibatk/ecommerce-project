import { STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { errorResponse, successResponse } from "../constants/response.js";
import Profile from "../models/userProfileModel.js";
//@desc Create user profile
//@route POST /api/userProfile/:userId
//@ access user/admin
export const createUserProfiles=async(req,res)=>{
    try{
        const {userId}=req.params;
        const {phone,dob,gender}=req.body;
     //Check user exist or not   
    if(!userId)
    {
        return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.USER_NOT_FOUND)
    }
        //validate required feilds
        if(!userId ||!phone|| !dob|| !gender)
        {
            return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.ALL_FIELDS_REQUIRED)
        }
//check the profile already exist or not
const profileExiste=await Profile.findOne({phone})
if(profileExiste)
{
    return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.PROFILE.ALREADY_EXISTE)
}
    //Create profile
    const profile=await Profile.create({
      userId,
      phone,
      dob,
      gender     ,      
    })
       return successResponse(res,STATUS.OK,MESSAGES.PROFILE.PROFILE_CREATED,profile)
    }

    catch(error){
        console.error(error);
        return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR);
    }
}
//@desc get all user profile
//@route GET /api/userProfile/
//@access Admin
export const getAllUserProfile=async(req,res)=>{
    try{
        const profiles=await Profile.find({})
        return successResponse(res,STATUS.OK,MESSAGES.PROFILE.PROFILES_FETCHED,profiles)

    }
    catch(error){
        console.error(error);
        return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR);
    }
}
//@desc get one user profile
//@route GET /api/userProfile/:userId
//@access Admin
export const getOneUserProfile=async(req,res)=>{
   try{
    const {userId}=req.params;
    const profile=await Profile.findById(userId)
    if(!profile){
        return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.PROFILE.NOT_FOUND);
    }
    return successResponse(res,STATUS.OK,MESSAGES.PROFILE.PROFILE_FETCHED,profile);

    }
catch(error){
     console.error(error);
     return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.SERVER_ERROR);
    }
}
//@desc Update user profile
//@route PUT /api/userProfile/:userId
//@access Admin
export const updateUserProfile=async(req,res)=>{
    try{
        const {userId}=req.params;
        const {phone,dob,gender}=req.body;
        const profile=await Profile.findOne({userId});
        if(profile){
            profile.phone=phone || profile.phone;
            profile.dob=dob || profile.dob;
            profile.gender=gender || profile.gender;
        
        const updatedProfile=await profile.save();
        return successResponse(res,STATUS.OK,MESSAGES.PROFILE.PROFILE_UPDATED,profile);
        }
        else{
            return errorResponse(res,STATUS.NOT_FOUND,MESSAGES.PROFILE.NOT_FOUND);
        }
        
    }
    catch(error){
        console.error(error)
        return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR,error.message);
    }
}
//@desc Delete user profile
//@route DELETE /api/userProfile/:userId
//@access Admin
export const deleteUserProfile=async(req,res)=>{
    try{
        const {userId}=req.params;
        const deleteProfile=await Profile.findOneAndDelete({userId})
        if(!deleteProfile){
            return errorResponse(res,STATUS.NOT_FOUND,MESSAGES.PROFILE.NOT_FOUND)
        }
        return successResponse(res,STATUS.OK,MESSAGES.PROFILE.DELETED,deleteProfile);
    }
    catch(error){
        console.error(error);
        return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR);
    }
}
