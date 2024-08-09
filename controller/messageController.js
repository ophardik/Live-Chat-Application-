const { io, getReceiverSocketId } = require('../Socket/sockets'); // Ensure path is correct
const Conversation = require('../model/Conversation'); // Adjust the path as needed
const Message = require('../model/messageModel'); // Adjust the path as needed

const sendMessage = async (req, res) => {
    try {
        const senderId = req.id; // Ensure req.id is correctly set
        const receiverId = req.params.id;
        const { message } = req.body;

        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            gotConversation.messages.push(newMessage._id);
            await gotConversation.save();
        }

        // Ensure receiverSocketId is being logged correctly
        const receiverSocketId = getReceiverSocketId(receiverId);
        console.log(`Sending new message to receiverSocketId: ${receiverSocketId}`);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        } else {
            console.log(`No socket found for receiverId: ${receiverId}`);
        }

        return res.status(201).json({
            newMessage
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    sendMessage,
    getMessage
};
