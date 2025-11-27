import express from "express";
import {addProduct,
    removeProduct,
    singleProduct,
    listProducts,
    } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

//@route POST /api/products
//desc add new Product
productRouter.post("/add",adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1},]),addProduct);

//@route POST /api/products
//@desc list all Products
productRouter.get("/list",listProducts);

//@route GET /api/Products
//@desc Get Product by id
productRouter.get("/single",singleProduct);

//@route DELETE /api/products/:id
//@desc remove product
productRouter.delete("/remove",adminAuth,removeProduct);

export default productRouter;
