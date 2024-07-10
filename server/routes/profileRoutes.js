const { Router } = require("express")
const {   getProfileControllers } = require("../controllers/profileControllers.js")
let router = Router();

// Get , User Profile =>
router.post("/profile", getProfileControllers);
module.exports = router;  