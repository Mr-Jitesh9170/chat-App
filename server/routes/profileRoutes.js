const { Router } = require("express")
const { updateProfileControllers, getProfileControllers } = require("../controllers/profileControllers.js")
let router = Router();

// Get , User Profile =>
router.post("/profile", getProfileControllers);

// Update User Profile =>
router.put("/profile", updateProfileControllers);

module.exports = router;