import express from "express";
import {createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct 
    } from "../controllers/productController.js";


const router = express.Router();

//@route POST /api/products
//desc Create new Product
router.post("/",createProduct);

//@route GET /api/products
//@desc Get all Products
router.get("/",getProducts);

//@route GET /api/Products
//@desc Get Product by id
router.get("/:id",getProductById);

//@route PUT /api/products/:id
//@desc Update product
router.put("/:id",updateProduct);

//@route DELETE /api/products/:id
//@desc Delete product
router.delete("/:id",deleteProduct);

export default router;
