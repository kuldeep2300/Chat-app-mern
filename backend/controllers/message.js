const Conversation = require("../models/conversation");
const Message = require("../models/message");
const { getReceivedSocketId, io } = require("../socket/socket");

const handleSendMessage = async (req, res) => { 
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;  // Using optional chaining to avoid errors

    if(!senderId || !receiverId) {
      return res.status(400).json({ error: 'Sender or receiver ID is missing' }); // Return a 400 Bad Request response if either senderId or receiverId is missing
    }

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

    //! This will run in parallel - Remember this line is very necessary to update and storing document (row) in the database, conversation and newMessage both are document (row) in their collections, by creating a collection (table) in our database it will return us promises which will be stored in the coversation and newMessage and then we have to handle promises all using promise.all[] method inwhich it will return one single promise after having all promises fulfilled. Here our data will store in the databases, asynchronous code is necessary here, that's why both run in parallel.
    // Save both conversation and message in parallel in the database then send it to the other user using socket io functionality
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO MESSAGE FUNCTIONALITY FOR THE RECEIVER WILL GO HERE - SO THAT MESSAGE WILL APPEAR IN REAL-TIME WITHOUT REFRESHING THE PAGE
    const receiverSocketId = getReceivedSocketId(receiverId);
    if(receiverSocketId) {                              //  Meaning if receiver is also online then it socketId is true and it will receive message in real-time
      // io.to(<socket_id>).emit() used to send events to specific client only, we will handle this using hook in frontend
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }
    
    return res.status(201).json(newMessage);
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

    return res.status(200).json(message);
  } catch (error) {
    console.log("Error in handleGetMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  handleSendMessage,
  handleGetMessage,
};
