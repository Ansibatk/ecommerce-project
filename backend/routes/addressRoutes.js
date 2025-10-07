import express from "express";
import { addAddress,
         deleteAddress,
         getUserAddress,
         updateAddress 
        } from "../controllers/addressController.js";
const router=express.Router();

//@route POST /api/address
//@desc Create address
router.post("/",addAddress);
//@route GET /api/address/:id
//@desc Get User address
router.get("/:userId",getUserAddress);
//@route PUT /api/address/:id
//@desc Update User address
router.put("/:addressId",updateAddress);
//@route DELETE /api/address/:id
//@desc Delete User address
router.delete("/:addressId",deleteAddress);

export default router;