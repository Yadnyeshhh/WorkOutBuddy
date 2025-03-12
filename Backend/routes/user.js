const express = require("express");
const router = express.Router();

//controller cuntions
const { signupUser, loginUser } = require("../controllers/usercontroller");

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

module.exports = router;
