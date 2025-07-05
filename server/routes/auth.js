const express=require("express");
const authController = require("../controllers/authController.js");
const { protect } = require("../middleware/auth");

const router=express.Router();

router.post("/signup",authController.registerUser);
router.post("/login",authController.loginUser);
router.post("/logout",authController.logoutUser);
router.get("/all",authController.getAllUsers);

// router.get("/me", authController.getCurrentUser);

module.exports = router;