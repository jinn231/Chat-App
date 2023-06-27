const express = require("express");
const router = express.Router();
const {verifyToken} = require("./../verifyToken");
const { createConversation, getConversation } = require("../controller/conversation");

// create conversation
router.post("/create", verifyToken, createConversation )

// get conversation 
router.get("/:userId", verifyToken , getConversation)

module.exports = router;