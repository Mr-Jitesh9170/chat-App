const { Router } = require("express")
const { massageControllers, unseenMsgCounts } = require("../controllers/chatControllers.js")
const router = Router();

router.post("/user/unseen/massage/:roomId?", unseenMsgCounts)
router.get("/user/massage/:roomId?", massageControllers)

module.exports = router;  