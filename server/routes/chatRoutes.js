const { Router } = require("express")
const { getChatControllers, postChatControllers, deleteChatControllers } = require("../controllers/chatControllers.js")
const router = Router();

// Chat Controllers Routes =>
router.get("/chat", getChatControllers)
router.post("/chat", postChatControllers)
router.delete("/chat", deleteChatControllers)

module.exports = router;