import { STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { errorResponse, successResponse } from "../constants/response.js";
import Cart from "../models/cartModel.js";
//@desc Get cart for a user
//@route GET /api/carts/:userId
//@access Private
export const getCart=async(req,res)=>{
    try{
      const {userId}=req.params;
      const cart=await Cart.findOne({user:userId})
      .populate({path:"user",
        select:"name email",
      })
      .populate({
        path:"cartItems",
        populate:{path: "product", select:"name price"},
      })
      if(!cart){
        return errorResponse(res,STATUS.NOT_FOUND,MESSAGES.CART.NOT_FOUND);
      }
      return successResponse(res,STATUS.OK,MESSAGES.CART.FETCH_SUCCESS,cart);
    }
    catch(error){
       return errorResponse(res,STATUS.SERVER_ERROR,error.message)
    }
};
//@desc Add item to cart
//@route POST /api/carts/:userId/items
//@access Private
export const addToCart=async(req,res)=>{
    try{
      const {userId}=req.params;  
      const{productId,quantity}=req.body

      let cart=await Cart.findOne({user:userId});
      if(!cart){
        cart=new Cart({user:userId});
        await cart.save();

      }

      let cartItem=await CartItem.findOne({cart:cart._id, product:productId})

      if(cartItem){
        cartItem.quantity+=quantity;
        await cartItem.save(); 
      }
      else{
        cartItem=new cartItem({
            cart:cart._id,
            product:productId,
            quantity,
        });
        await cartItem.save();
        cart.cartItems.push(cartItem._id);
        await cart.save();
      }
      return successResponse(res,STATUS.CREATED,MESSAGES.CART.ITEM_ADDED,cartItem);
    }
    catch(error){
     return errorResponse(res,STATUS.SERVER_ERROR,error.message);
    }
};
//@desc Delete product from cart
//@route Delete /api/cart/:userId/items/:itemId
//@access Private
export const removeFromCart=async(req,res)=>{
    try{
      const {itemId}=req.params;
      const deletedItem=await findByIdAndDelete(itemId);

      if(!deletedItem){
        return errorResponse(res,STATUS.NOT_FOUND,MESSAGES.CART.ITEM_NOT_FOUND);
      }
      return successResponse(res,STATUS.OK,MESSAGES.CART.ITEM_REMOVED,deletedItem);
    }
    catch(error){
       return errorResponse(res,STATUS.SERVER_ERROR,error.message);
    }
};
