const chatsModel = require("../models/chatModel.js");

// Get , all the chats =>
exports.getChatControllers = async (req, res) => {
  try {
    let loadingChats = await chatsModel.find();
    res.json(
      {
        status: 200,
        massage: "all the chats loaded",
        results: loadingChats
      }
    )
  } catch (error) {
    console.log("data not inserted in database.")
    res.json(
      {
        status: 500,
        massage: "Internal server error"
      }
    )
  }
}

// Post , save the chats of the users =>
exports.postChatControllers = async (req, res) => {
  try {
    let { sender, message, timestamp } = req.body;
    await chatsModel.create({ sender, message, timestamp });
    res.json(
      {
        status: 200,
        massage: "chat saved successfully in the database!",
      }
    )
  } catch (error) {
    console.log("chat not inserted in database.")
    res.json(
      {
        status: 500,
        massage: "Internal server error"
      }
    )
  }
}

// Delete , deleting chats of the users =>
exports.deleteChatControllers = async (req, res) => {
  try {
    let { _id } = req.body;
    await chatsModel.findByIdAndDelete(_id);
    res.json(
      {
        status: 200,
        massage: "chat deleted successfully!",
      }
    )
  } catch (error) {
    console.log("chat not deleted successfully")
    res.json(
      {
        status: 500,
        massage: "Internal server error"
      }
    )
  }
} 