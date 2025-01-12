const { Router } = require("express")
const { massageControllers, unseenMsgCounts, getUserRegister } = require("../controllers/chatControllers.js")
const router = Router();

router.post("/user/unseen/massage/:roomId?", unseenMsgCounts)
router.get("/user/massage/:roomId?", massageControllers)
router.get("/register", getUserRegister);


module.exports = router;    