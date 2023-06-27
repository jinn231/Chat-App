const express = require("express");
const router = express.Router();
const {verifyToken} = require("./../verifyToken");
const {newMessage, getMessage} = require("./../controller/message")

// new Message
router.post("/new-message", verifyToken, newMessage )

// get conversation 
router.get("/:convId", verifyToken , getMessage)

module.exports = router;