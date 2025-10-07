import express from "express";
import { 
     createOrder,      deleteOrder,
     getOrderById, getUserOrders, updateOrderStatus 
    } from "../controllers/orderController.js";
const router=express.Router();

//Create order (Buy Now)
router.post("/:userId",createOrder);

//Get all order for a user
router.get("/user/:userId",getUserOrders);

//Get single order by Id
router.get("/:orderId",getOrderById);

//Update order status
router.put("/:orderId",updateOrderStatus);

//Delete order
router.delete("/:orderId",deleteOrder);

export default router;