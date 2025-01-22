const massageModel = require("../models/message.js");
const roomModel = require("../models/chatRoom.js");
const userModel = require('../models/register.js');

exports.registeredUserLists = async (req, res, next) => {
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
        next(error)
    }
}

exports.massageControllers = async (req, res, next) => {
    let { userId, roomId } = req.body;
     if (!userId || !roomId) {
        return res.status(400).json({ message: "Missing field!" })
    }
    try {
        let userDetails = await userModel.findOne({ _id: userId }).select("name profilePhoto isOnline lastSeen");
        if (!userDetails) {
            return res.status(404).json({ message: "Invalid data!" })
        }
        let roomDetails = await roomModel.findOne({ roomId });
        if (!roomDetails) {
            return res.status(200).json({ message: "No convertation found!", userDetails, converstationLists: [] })
        }
        let converstationLists = await massageModel.find({ roomChatId: roomDetails._id });
        if (!converstationLists.length) {
            return res.status(200).json({ massage: "User details but No conversation found!", userDetails, converstationLists: [] })
        }
        res.status(200).json({ massage: "User details and converstations!", userDetails, converstationLists })
    } catch (error) {
        next(error)
    }
}

// socket connection =>
exports.socketConnection = (io) => {

    io.on("connection", (socket) => {
        socket.on('isOnline', async ({ isOnline, user }) => {
            socket.username = user;
            await userModel.findOneAndUpdate({ _id: user }, { isOnline });
        })

        socket.on("roomJoin", async (roomNumber) => {
            if (roomNumber.roomId === "" || roomNumber.roomId === undefined) {
                return
            }
            let isRoom;
            isRoom = await roomModel.findOne({ roomId: roomNumber?.roomId }).select('_id');
            if (!isRoom) {
                isRoom = await roomModel.create(roomNumber);
            }
            let isChats = await massageModel.find({ roomChatId: isRoom._id });
            if (isChats.length) {
                await massageModel.updateMany({ roomChatId: isRoom._id, senderId: { $ne: roomNumber.user }, seen: false }, { seen: true });
            }
            socket.emit('roomJoin', { roomId: roomNumber.roomId, roomChatId: isRoom._id });
            socket.join(roomNumber.roomId);
        })

        socket.on('typing', ({ isTyping, roomId, _id }) => {
            io.to(roomId).emit('typing', { isTyping, _id })
        })

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

        socket.on("roomLeave", (roomNumber) => {
            socket.leave(roomNumber);
        })

        socket.on("disconnect", async () => {
            await userModel.findOneAndUpdate({ _id: socket.username }, { isOnline: false, lastSeen: new Date() });
        });

    });
}