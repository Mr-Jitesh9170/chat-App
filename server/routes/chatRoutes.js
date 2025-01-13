const { Router } = require("express")
const { massageControllers, getUserRegister } = require("../controllers/chatControllers.js")
const router = Router();

router.get("/user/massage/:roomId?", massageControllers)
router.get("/register/:userId?", getUserRegister);


module.exports = router;    