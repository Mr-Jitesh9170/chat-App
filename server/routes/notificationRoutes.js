const { Router } = require("express")
const { notificationRead, notificationListAndCount, createNotifications, deleteNotifications } = require("../controllers/notificationControllers.js")

const router = Router();

router.post("/chit-chat/user/notification/delete", deleteNotifications)
router.post("/chit-chat/user/notification/lists", notificationListAndCount)
router.post("/chit-chat/user/notification/isRead", notificationRead)
router.post("/chit-chat/user/notification/create", createNotifications)

module.exports = router;