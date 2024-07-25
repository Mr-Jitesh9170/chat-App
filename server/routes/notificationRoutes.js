const { Router } = require("express")
const { notificationRead, notificationListAndCount } = require("../controllers/notificationControllers.js")

const router = Router();

router.post("/chit-chat/user/notification/lists", notificationListAndCount)
router.post("/chit-chat/user/notification/isRead", notificationRead)

module.exports = router;