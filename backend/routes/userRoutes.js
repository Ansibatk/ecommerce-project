import express from "express";
import {registerUser,
        loginUser,
        getUser,
        getUserById,
        updateUser,
        deleteUser,
       } from "../controllers/userController.js";

const router = express.Router();

//@route POST /api/users/register
//desc Register new user
router.post("/register",registerUser);

//@route POST /api/users/login
//@desc Authenticate user
router.post("/login",loginUser);

//@route GET /api/users
//@desc Get all users
router.get("/",getUser);

//@route GET /api/users/:id
//@desc Get one user by id
router.get("/:id",getUserById);

//@route PUT /api/users/:id
//@desc Update user
router.put("/:id",updateUser);

//@route DELETE /api/users/:id
//@desc Delete user
router.delete("/:id",deleteUser);

export default router;