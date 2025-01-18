const { Router } = require("express")
const { massageControllers, registeredUserLists } = require("../controllers/chatControllers.js")
const router = Router();

router.get("/user/massage/:roomId?", massageControllers)
router.get("/register/:userId?", registeredUserLists);


module.exports = router;    