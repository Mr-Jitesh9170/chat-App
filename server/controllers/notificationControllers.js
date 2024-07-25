const notificationModel = require("../models/notification.js")

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

exports.deleteNotifications = async (req, res) => {
    let { notificationId: _id } = req.body;
    try {
        await notificationModel
    } catch (error) {
        console.log(error, "<---- error delete notifications!")
        res.json({ status: 500, message: "Internal server error!" })
    }
}

exports.createNotifications = async (req, res) => {
    let { } = req.body
    try {

    } catch (error) {

    }

}