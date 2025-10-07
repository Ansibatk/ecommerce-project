import { STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { errorResponse, successResponse } from "../constants/response.js";
import Order from "../models/ordersModel.js";
//@desc Create order(Buy Now)
//@route POST /api/orders/:userId
//@access Private 
export const createOrder=async(req,res)=>{
    try{

    }
    catch(error){
        
    }
}
//@desc Get all orders for a user
//@route GET /api/orders/:userId
//@access private
export const getUserOrders=async(req,res)=>{
    try{
        const{userId}=req.params;
        //fetch all orders for a user
        const orders=await Order.find({user:userId}).populate("user","name","email");
        if(!orders ||!orders.length===0){
            return errorResponse(res,STATUS.NOT_FOUND,MESSAGES.ORDER.NOT_FOUND);
        }
        //for each order ,fetch corresponding order items
        const orderWithItems=await Promise.all(
            orders.map(async (order)=>{
                const items=await orderWithItems.find({order:order._id}).populate("product"," name price")
                return {...order.toObject(),orderItems:items};
            })
        );
        return successResponse(res,STATUS.OK,MESSAGES.ORDER.FETCHED,orderWithItems);
    }
    catch(error){
     console.error(error);
     return errorResponse(res,STATUS.INTERNAL_ERROR,error_message)
    }
}
//@desc Get single order by id
//@route GET /api/orders/:orderId
//@access 
export const getOrderById=async(req,res)=>{
    try{

    }
    catch(error){

    }
}
//@desc Create order
//@route POST /api/order/:orderId
//@access 
export const updateOrderStatus=async(req,res)=>{
    try{

    }
    catch(error){

    }
}
//@desc Delete order 
//@route DELETE /api/order/:orderId
//@access 
export const deleteOrder=async(req,res)=>{
    try{

    }
    catch(error){

    }
}