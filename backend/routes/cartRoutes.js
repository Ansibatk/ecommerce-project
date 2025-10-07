import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";
const router=express.Router();

//GET cart for a user
router.get("/:userId",getCart);

// Add product to cart
router.post("/:userId/items",addToCart);

// Remove product from cart
router.delete("/:userId/items/:itemId",removeFromCart);

export default router;