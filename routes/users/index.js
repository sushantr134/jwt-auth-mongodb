const express = require("express");
const router = express.Router();

//controller
const registerUser = require("../../controllers/user/register/index");
const loginUser = require("../../controllers/user/login/index");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
