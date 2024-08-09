const express = require("express");
const router = express.Router();
const{sendMessage,getMessage}=require("../controller/messageController");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/sendMessage/:id",isAuthenticated,sendMessage)
router.get("/getMessage/:id",isAuthenticated,getMessage)
module.exports=router
