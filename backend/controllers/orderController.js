import { STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { errorResponse, successResponse } from "../constants/response.js";
import orderModel from "../models/ordersModel.js"
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import dotenv from 'dotenv';
dotenv.config();

//global variables
const currency="usd"
const deliveryCharge=10

//gateway initialize
const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)

//Placing orders using COD Method
export const placeOrder = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        return successResponse(res, STATUS.OK, MESSAGES.ORDER.CREATE_SUCCESS)

    }
    catch (error) {
        console.log(error);
        return errorResponse(res, STATUS.INTERNAL_ERROR, MESSAGES.ORDER.CREATE_FAILED)

    }
}

//Placing orders using Stripe Method
export const placeOrderStripe = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body;
        const {origin}= req.headers;

          if (!items || !Array.isArray(items) || items.length === 0) {
            return errorResponse(res, STATUS.BAD_REQUEST,MESSAGES.ORDER.ITEMS_MISSING );
        }

        
        if (!amount) {
            return errorResponse(res, STATUS.BAD_REQUEST,MESSAGES.ORDER.AMOUNT_MISSING );
        }

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

         const newOrder = new orderModel(orderData)
        await newOrder.save()
        //LINE ITEMS — use values sent from frontend
        const line_items = items.map((item)=>({
            price_data:{
                currency:currency,
                product_data: {
                    name:item.name ||"Product"
                },
                unit_amount: item.price * 100
            },
            quantity:item.quantity
        }))
         // Add delivery charge
        line_items.push({
             price_data:{
                currency:currency,
                product_data: {
                    name:'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity:1
        })
        //Create stripe session '  
        const session=await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })
        
        return successResponse(res,STATUS.OK,MESSAGES.ORDER.PAYMENT_SESSION_CREATED,  {
            session_url: session.url,
        })
    }
    catch (error) {

         console.log(error);
        return errorResponse(res, STATUS.SERVER_ERROR, MESSAGES.SERVER_ERROR, {
            message: error.message,
        });
    }
}

//Verify Stripe
export const verifyStripe = async (req,res) =>{

    const { orderId, success, userId }=req.body

    try{
        if(success ==="true") {
             // Update payment status for the order
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            // Clear user's cart
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            return successResponse(res,STATUS.SUCCESS,MESSAGES.ORDER.PAYMENT_SUCCESS)
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            return errorResponse(res,STATUS.BAD_REQUEST,MESSAGES.ORDER.PAYMENT_FAILED)
        }
    }
    catch(error){
         return errorResponse(
            res,
            STATUS.SERVER_ERROR,
            MESSAGES.SERVER_ERROR
        );
    }
}

//All Orders data for Admin Panel
export const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({})
        return successResponse(res, STATUS.OK, MESSAGES.ORDER.FETCH_SUCCESS, orders)
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, STATUS.INTERNAL_ERROR, MESSAGES.ORDER.CREATE_FAILED)
    }
}

//User Order Data For Frontend
export const userOrders = async (req, res) => {
    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })

        return successResponse(res, STATUS.OK, MESSAGES.ORDER.FETCHED, orders)
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, STATUS.INTERNAL_ERROR, MESSAGES.ORDER.CREATE_FAILED)
    }
}

//Update order status from Admin Panel
export const updateStatus = async (req, res) => {
    try {

        const {orderId,status}= req.body

        await orderModel.findByIdAndUpdate(orderId,{ status })
        return successResponse(res,STATUS.OK,MESSAGES.ORDER.STATUS_UPDATED)
    }
    catch (error) {
        console.log(error)
        return errorResponse(res,STATUS.SERVER_ERROR,MESSAGES.SERVER_ERROR)
        
    }
}