const express = require("express")
const { registerUser, loginUser } = require("../controllers/chatApp.js")
const router = express.Router();


router.post("/user/register", registerUser);
router.post("/user/login", loginUser)

 

module.exports = router;