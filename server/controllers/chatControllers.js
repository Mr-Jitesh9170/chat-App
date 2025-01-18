const massageModel = require("../models/message.js");
const roomModel = require("../models/chatRoom.js");
const userModel = require('../models/register.js');

exports.registeredUserLists = async (req, res) => {
    let { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ message: "Missing data!" })
    }
    try {
        let users = await userModel.find({ _id: { $ne: userId } }).select("-password").lean();
        if (!users.length) {
            return res.status(404).json({ message: "No users Found!" })
        }
        await Promise.all(users.map(async (userData) => {
            let roomData = await roomModel.findOne({
                participant: { $all: [userId, userData._id] }
            })
            if (!roomData) {
                return;
            }
            let totalMessge = await massageModel.find({ roomChatId: roomData._id, senderId: { $ne: userId }, seen: false }).sort({ timestamp: -1 });
            let lastMessage = await massageModel.find({ roomChatId: roomData._id }).sort({ timestamp: -1 });
            userData.unreadMsg = totalMessge.length;
            userData.lastMessage = lastMessage[0]?.massage;
            userData.roomId = roomData.roomId;
        }))
        res.json({ status: 200, massage: "Registered users lists!", results: users })
    } catch (error) {
        console.log(error, " <----Error in getUserRegister")
        res.json({ status: 500, massage: "Internal server error" })
    }
}

// method => GET
// work => user massages =>
// routes => /user/massage/:roomId?
exports.massageControllers = async (req, res) => {
    let roomId = req.params.roomId;
    if (!roomId) {
        return res.status(400).json({ message: "Missing roomId!" })
    }
    try {
        let room = await roomModel.findOne({ roomId })
        if (!room) {
            return res.status(400).json({ message: "Invalid roomId!" })
        }
        let massages = await massageModel.find({ roomChatId: room._id }).select('massage seen senderId timestamp');
        if (!massages.length) {
            return res.status(400).json({ message: "No convertations!" })
        }
        res.json({ status: 200, massage: `RoomId => ${roomId} of massages!`, results: massages })
    } catch (error) {
        console.log(error, "<--- error feching massages!")
        res.json({ status: 500, massage: error, results: [] })
    }
}



// socket connection =>
exports.socketConnection = (io) => {

    // socket connection =>
    io.on("connection", (socket) => {

        console.log(`This User => ${socket.id} connected!!`);

        // isOnline =>
        socket.on('isOnline', async ({ isOnline, user }) => {
            socket.username = user;
            await userModel.findOneAndUpdate({ _id: user }, { isOnline });
        })

        // room joined =>
        socket.on("roomJoin", async (roomNumber) => {
            if (roomNumber.roomId === "" || roomNumber.roomId === undefined) {
                return
            }
            let isRoom;
            isRoom = await roomModel.findOne({ roomId: roomNumber?.roomId }).select('_id');
            if (!isRoom) {
                isRoom = await roomModel.create(roomNumber);
            }
            await massageModel.updateMany({ roomChatId: isRoom._id, senderId: { $ne: roomNumber.user }, seen: false }, { seen: true });
            socket.emit('roomJoin', { roomId: roomNumber.roomId, roomChatId: isRoom._id });
            socket.join(roomNumber.roomId);
        })

        // typing =>
        socket.on('typing', ({ isTyping, roomId, _id }) => {
            io.to(roomId).emit('typing', { isTyping, _id })
        })

        // chat massages =>
        socket.on("chat", async (roomId, newMassages) => {
            let roomSize = io.sockets.adapter.rooms.get(roomId)?.size;
            if (roomSize > 1) {
                newMassages.seen = true;
                let savedMassage = await massageModel.create(newMassages);
                io.to(roomId).emit("chat", savedMassage)
            } else {
                let savedMassage = await massageModel.create(newMassages);
                io.to(roomId).emit("chat", savedMassage)
            }
        })

        // room leaved =>
        socket.on("roomLeave", (roomNumber) => {
            socket.leave(roomNumber);
        })

        // user disconnected =>
        socket.on("disconnect", async () => {
            await userModel.findOneAndUpdate({ _id: socket.username }, { isOnline: false, lastSeen: new Date() });
            console.log(`This User => ${socket.id} disconnected!!`)
        });

    });
}