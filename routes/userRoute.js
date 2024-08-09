const express = require("express");
const router = express.Router();
const isAuthenticated=require("../middleware/isAuthenticated")

const { signup,login,logout,getOtherUser } = require("../controller/userController");

router.post("/signup",signup)
router.post("/login",login)
router.get("/logout",logout)
router.get("/getOtherUser",isAuthenticated,getOtherUser)

module.exports=router