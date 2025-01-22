const { Router } = require("express")
const { massageControllers, registeredUserLists } = require("../controllers/chatControllers.js")
const router = Router();

router.post("/user/1to1/convertations", massageControllers)
router.get("/register/:userId?", registeredUserLists);


module.exports = router;     