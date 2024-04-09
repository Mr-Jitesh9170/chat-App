const { Router } = require("express")
const { updateProfileControllers } = require("../controllers/profileControllers.js")
let router = Router();

// Update User Profile =>
router.put("/profile", updateProfileControllers);

module.exports = router;