const express = require("express")
const { registerUser } = require("../controllers/chatApp.js")
const router = express.Router();


router.post("/", registerUser)


module.exports = router;