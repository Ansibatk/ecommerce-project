import express from "express";
import { 
    createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory 
        } from "../controllers/categoryController.js";
        
const router=express.Router();

//@desc create category
//@route POST /api/categories/:userId
router.post("/:userId",createCategory)

//@desc Get all product categorys
//@route GET /api/categories/:userId
router.get("/",getAllCategory);

//@desc Get one category by id
//@route GET /api/category/:categoryId
router.get("/:categoryId",getCategoryById);

//@desc Update Category
//@route PUT /api/category/:categoryId
router.put("/:categoryId",updateCategory);

//@desc Delete Category
//@route DELETE /api/category/:categoryId
router.put("/:categoryId",deleteCategory);

export default router;

