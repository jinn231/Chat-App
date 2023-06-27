const express = require("express");
const router = express.Router();
const { SignIn, SignUp, signInWithGoogle } = require("./../controller/auth")

router.post("/sign-in", SignIn )

router.post("/sign-up", SignUp )

router.post("/oAuth", signInWithGoogle)

module.exports = router;