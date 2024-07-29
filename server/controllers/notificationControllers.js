const notificationModel = require("../models/notification.js")


// delete notifications =>
exports.deleteNotifications = async (req, res) => {
    let { toUser, deleteIds } = req.body;
    try {
        let results = await notificationModel.deleteMany({ toUser, _id: { $in: deleteIds } });
        console.log(results, "<---- deleted successfully!");
    } catch (error) {
        console.log(error, "<---- error delete notifications!")
        res.json({ status: 500, message: "Internal server error!" })
    }
}

// notification lists and count =>
exports.notificationListAndCount = async (req, res) => {
    let { userId } = req.body;
    try {
        let notiLists = await notificationModel.find({ toUser: userId }).populate(
            {
                path: "userId",
                select: "name profilePhoto"
            }
        )
        let notifiCounts = (await notificationModel.find({ toUser: userId, isRead: false })).length;
        if (!notiLists.length) {
            return res.json({ status: 200, message: "No notification!", notifiCounts, notiLists })
        }
        res.json({ status: 200, message: "Notification lists!", notifiCounts, notiLists })
    } catch (error) {
        console.log(error, "<---- Error lists & counts notifications!")
        res.json({ status: 500, message: "Internal server error!" })
    }
}

// read notifications =>
exports.notificationRead = async (req, res) => {
    let { notificationIds } = req.body;
    try {
        let isRead = await notificationModel.findOneAndUpdate({ _id: notificationIds }, { isRead: true });
        if (!isRead) {
            return res.json({ status: 200, message: "Notification reading failed!" })
        }
        res.json({ status: 200, message: "Notification reading successfully!" })
    } catch (error) {
        console.log(error, "<---- Error  isRead notifications!")
        res.json({ status: 500, message: "Internal server error!" })
    }
}
// create notifications =>
exports.createNotifications = async (req, res) => {
    let { userId, toUser, notifyMsg, isRead, timestamp } = req.body;
    try {
        await notificationModel.create(req.body);
        res.json({ status: 200, message: "Notification sent successfully!" })
    } catch (error) {
        console.log(error, "<---- Create notifications!")
        res.json({ status: 500, message: "Internal server error!" })
    }
}