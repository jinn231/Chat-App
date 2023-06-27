const express = require("express");
const router = express.Router();
const { getUser, getUserInformattion, getUserByName, getUserByEmail, updateData } = require("./../controller/user");
const { verifyToken } = require("../verifyToken");

// get login user
router.get("/find", verifyToken ,getUser)

router.get("/findbyname", verifyToken, getUserByName)

router.get("/findbyemail", verifyToken, getUserByEmail)

router.put("/update", verifyToken, updateData )

// get user
router.get("/:userId", verifyToken, getUserInformattion)



module.exports = router;