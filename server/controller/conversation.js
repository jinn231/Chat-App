const { errorHandler } = require("../errorHandler")
const Conversation = require("./../model/Conversation")


exports.createConversation = async (req, res, next) => {
    try {
        const { senderId, receiverId } = req.body;

        const existingConversation = await Conversation.findOne({
            members: {
                $all: [senderId, receiverId]
            }
        });

        if (existingConversation) {
            // Conversation already exists
            errorHandler(400, "User already exists!")
        }

        const conversation = new Conversation({
            members: [senderId, receiverId]
        });

        const newConversation = await conversation.save();

        res.status(201).json(newConversation);
    } catch (error) {
        next(error);
    }
};


// get Conversation
exports.getConversation = async (req, res, next) => {
    try {
        const conversation = await Conversation.find({
            members: { $in:[req.params.userId ]}
        }).sort({ createdAt: -1 })

        res.status(201).json(conversation)
    } catch (error) {
        next(error)
    }
}