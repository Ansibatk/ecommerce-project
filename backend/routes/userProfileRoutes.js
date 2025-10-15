import express from"express";
import {createUserProfiles,
    getAllUserProfile,
    getOneUserProfile,
    updateUserProfile,
    deleteUserProfile}from "../controllers/userProfileController.js"
const router=express.Router();
//@route POST /api/userProfiles/:userId
//@desc create one userProfile
router.post("/:userId",createUserProfiles);
//@route GET /api/userProfiles/
//@desc get all userProfile
router.get("/",getAllUserProfile);
//@route GET /api/userProfiles/:userId
//@desc Get one userProfile
router.get("/:userId",getOneUserProfile);
//@route PUT /api/userProfiles/:userId
//@desc ipdate userProfile
router.put("/:userId",updateUserProfile);
//@routeDELETE /api/userProfiles/:userId
//@desc DELETE one userProfile
router.delete("/:userId",deleteUserProfile);

export default router;