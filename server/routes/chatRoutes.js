const { Router } = require("express")
const { chatControllers } = require("../controllers/chatControllers.js")
const router = Router();

// chats =>
router.get("/chat", chatControllers)

module.exports = router;