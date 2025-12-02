import { STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { errorResponse, successResponse } from "../constants/response.js";
import userModel from "../models/userModel.js";
// add products to user cart
export const addToCart=async(req,res)=>{
  try{
    const{ userId, itemId, size} =req.body
    
    const userData= await userModel.findById(userId)
    let cartData=await userData.cartData;

    if(cartData[itemId]){
      if(cartData[itemId][size]){
        cartData[itemId][size] +=1
      }
      else{
         cartData[itemId][size]=1

      }
    }
    else{
       cartData[itemId]={}
       cartData[itemId][size]=1
    }

    await userModel.findByIdAndUpdate(userId,{cartData})

    return successResponse(res,STATUS.OK,MESSAGES.CART.ITEM_ADDED)
  }
  catch(error){
    console.log(error);
    return errorResponse(res,STATUS.INTERNAL_ERROR,MESSAGES.SERVER_ERROR)
    
  }
}

//update user cart
export const updateCart=async(req,res)=>{
  try{

      const {userId,itemId,size,quantity}=req.body
      const userData= await userModel.findById(userId)
      let cartData=await userData.cartData;

      cartData[itemId][size]=quantity

       await userModel.findByIdAndUpdate(userId,{cartData})

       return successResponse(res,STATUS.OK,MESSAGES.CART.CART_UPDATED)

}
  catch(error){
     console.log(error);
    return errorResponse(res,STATUS.INTERNAL_ERROR,MESSAGES.SERVER_ERROR)
  }
}

//get user cart data
export const getUserCart=async(req,res)=>{
  try{

    const {userId}=req.body

    const userData= await userModel.findById(userId)
    let cartData=await userData.cartData;

    return successResponse(res,STATUS.OK,MESSAGES.CART.CART_FETCHED,cartData)

  }
  catch(error){
     console.log(error);
    return errorResponse(res,STATUS.INTERNAL_ERROR,MESSAGES.ORDER.CREATE_FAILED)
  }
}