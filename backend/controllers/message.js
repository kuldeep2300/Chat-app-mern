const Conversation = require("../models/conversation");
const Message = require("../models/message");

const handleSendMessage = async (req, res) => { 
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // User have no chat then we will create conversation
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId], // Here we don't write the messages from the model because it's default empty and if someone started to talking then we push the code inside the empty array.
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // SOCKET IO FUNCTIONALITY WILL GO HERE

    //! This will run in parallel - Remember this line is very necessary to update and storing document (row) in the database, conversation and newMessage both are document (row) in their collections, by creating a collection (table) in our database it will return us promises which will be stored in the coversation and newMessage and then we have to handle promises all using promise.all[] method inwhich it will return one single promise after having all promises fulfilled. Here our data will store in the databases, asynchronous code is necessary here, that's why both run in parallel.
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in handleSendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleGetMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const message = conversation.messages;

    res.status(200).json(message);
  } catch (error) {
    console.log("Error in handleGetMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  handleSendMessage,
  handleGetMessage,
};
