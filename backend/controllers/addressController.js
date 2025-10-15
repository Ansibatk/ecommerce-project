import { STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { errorResponse, successResponse } from "../constants/response.js";
import Address from "../models/addressModel.js";
//@desc Create User Address 
//@route POST /api/address
//@access Private
export const addAddress=async(req,res)=>{
    try{
        const {userId,type,street,city,state,country,pincode}=req.body;
        // const userId= req.user._id;
         //Validate required feilds
        if(!userId || !type ||!street|| !city || !state ||!country ||!pincode)
        {
            return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.ALL_FIELDS_REQUIRED)
        }

         //Checking the Address is already existing or not
        const existingAddress=await Address.findOne({
                type,
                street,
                city,
                state,
                country,
                pincode})
        if(existingAddress){
            //Address already exists
            return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.ADDRESS.ALREADY_EXISTE)
        }
       
        //Create address
        const address= await Address.create({
            userId,
            type,
            street,
            city,
            state,
            country,
            pincode,
        })
        return successResponse(res,STATUS.CREATED,MESSAGES.ADDRESS.ADDRESS_CREATED,address)
        
    }
    catch(error){
        console.error(error);
        return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR)
    }
}
//@desc Get All User Address 
//@route GET /api/address/getAllAddress
//@access Private/Admin
export const getAllAddress=async(req,res)=>{
    try{
        const address= await Address.find({}).populate("userId", "name email");
        return successResponse(res,STATUS.OK,MESSAGES.ADDRESS.ADDRESS_FETCHED,address)
    }
    catch(error){
           console.error(error);
   return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR)
    }
}
//@desc Get User Address 
//@route GET /api/address/:userId
//@access Private
export const getUserAddress=async(req,res)=>{
    try{
        //Get userId from(middleware, params, or body)
        const userId = req.user?._id || req.params.userId || req.body.userId;

      if (!userId)
         {
          return errorResponse(res, STATUS.BAD_REQUEST, MESSAGES.USER_NOT_FOUND);
         }
       const addresses=await Address.find({userId});
       if(!addresses){
        errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.ADDRESS.NOT_FOUND);
       }
    if (!addresses || addresses.length === 0) 
    {
      return errorResponse(res, STATUS.NOT_FOUND, MESSAGES.ADDRESS.NOT_FOUND);
    }      
       return successResponse(res,STATUS.OK,MESSAGES.USER_ADDRESS_FETCHED,addresses)
    }
    catch(error){
      console.error(error);
      return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR)
    }
}
//@desc Update User Address 
//@route PUT/api/address/:addressId
//@access Private
export const updateAddress=async(req,res)=>{
    try{
        const {type,street,city,state,country,pincode}=req.body;
        const {addressId}=req.params;
           // Check if addressId is provided
    if (!addressId) {
      return errorResponse(res, STATUS.BAD_REQUEST, "Address ID is required");
    } 
        const address=await Address.findById(addressId);
        if(!address){
            return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.ADDRESS.NOT_FOUND);
        }
            address.type=type||address.type;
            address.street=street||address.street;
            address.city=city||address.city;
            address.state=state||address.state;
            address.country=country||address.country;
            address.pincode=pincode||address.pincode;
        const updatedAddress=await address.save();
        return successResponse(res,STATUS.OK,MESSAGES.ADDRESS.ADDRESS_UPDATED,updatedAddress);
        

    }
 
    catch(error){
        return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR, error.message);
    }
}
//@desc Dlete User Address 
//@route DELETE/api/address/:addressId
//@access Private
export const deleteAddress=async(req,res)=>{
    try{
        const addressId=req.params.addressId;
         console.log("Deleting address ID:", addressId);
        const address=await Address.findByIdAndDelete(addressId)
        if(!address){
            return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.ADDRESS.NOT_FOUND)
        }
        return successResponse(res,STATUS.SUCCESS,MESSAGES.ADDRESS.ADDRESS_DELETED,address);
    }
    catch(error){
        console.error("Delete address error",error);
        return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR)
    }
}
