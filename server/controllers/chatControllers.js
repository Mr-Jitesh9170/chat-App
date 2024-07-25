const massageModel = require("../models/message.js");
const roomModel = require("../models/chatRoom.js");
const userModel = require('../models/register.js');

// method => GET
// work => unseen massages =>
// routes => /user/unseen/massage/:userId?
exports.unseenMsgCounts = async (req, res) => {
    try {
        let { recieverId: senderId } = req.body;
        let roomId = req.params.roomId;
        if (!roomId) {
            throw 'Invalid userId!'
        }
        let isUserRoom = await roomModel.findOne({ roomId }).select('_id');
        if (!isUserRoom) {
            throw 'No room Exists!'
        }
        let unReadMsgCount = await massageModel.find({
            roomChatId: isUserRoom._id,
            senderId,
            seen: false
        });
        let lastMassage = await massageModel.find({ roomChatId: isUserRoom._id });
        res.json(
            {
                status: 200,
                massage: `userId => Rooms of unRead massages counts!`,
                results: { unReadMsgCount: !unReadMsgCount.length ? 0 : unReadMsgCount.length, lastMassage: !lastMassage.length ? '' : lastMassage[lastMassage.length - 1] }
            }
        )
    } catch (error) {
        console.log(error, "<----error unseen massage!")
        res.json(
            {
                status: 500,
                massage: error,
                results: []
            }
        )
    }
}

// method => GET
// work => user massages =>
// routes => /user/massage/:roomId?
exports.massageControllers = async (req, res) => {
    try {
        let roomId = req.params.roomId;
        if (!roomId) {
            throw "roomId invalid!"
        }
        let room = await roomModel.findOne({ roomId })
        if (!room) {
            throw "No room exists!"
        }
        let massages = await massageModel.find({ roomChatId: room._id }).select('massage seen senderId timestamp');
        if (!massages.length) {
            throw "No conversation found!"
        }
        res.json(
            {
                status: 200,
                massage: `RoomId => ${roomId} of massages!`,
                results: massages
            }
        )
    } catch (error) {
        console.log(error, "<--- error feching massages!")
        res.json(
            {
                status: 500,
                massage: error,
                results: []
            }
        )
    }
}

// socket connection =>
exports.socketConnection = (io) => {
    // socket connection =>
    io.on("connection", (socket) => {
        console.log(`This User => ${socket.id} connected!!`)
        // isOnline =>
        socket.on('isOnline', async ({ isOnline, user }) => {   
            socket.username = user;
            await userModel.findOneAndUpdate({ _id: user }, { isOnline });
        })
        // room joined =>
        socket.on("roomJoin", async (roomNumber) => {
            console.log(roomNumber.user, "<---- this user came")
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