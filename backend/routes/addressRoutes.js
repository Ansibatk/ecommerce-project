import express from "express";
import { addAddress,
         deleteAddress,
         getAllAddress,
         getUserAddress,
         updateAddress 
        } from "../controllers/addressController.js";
const router=express.Router();

//@route POST /api/address
//@desc Create address
router.post("/",addAddress);

//@route GET /api/address/getAllAddresses
//@desc Get All User address
router.get("/getAllAddress",getAllAddress);

//@route GET /api/address/:userId
//@desc Get User address
router.get("/:userId",getUserAddress);

//@route PUT /api/address/:addressId
//@desc Update User address
router.put("/:addressId",updateAddress);

//@route DELETE /api/address/:addressId
//@desc Delete User address
router.delete("/:addressId",deleteAddress);

export default router;