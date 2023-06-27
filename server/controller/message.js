const Message = require("./../model/Message")

// create new Message
exports.newMessage = async (req, res, next) => {
    const message = new Message({
        senderId: req.userId,
        conversationId: req.body.conversationId,
        message: req.body.message
    });

    try {
        const savedMessage = await message.save()
    
        res.status(200).json(savedMessage)
    } catch (error) {
        next(error)
    }
}

// get New Message
exports.getMessage = async (req, res, next) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.convId
        })
        
        res.status(200).json(messages)
    } catch (error) {
        next(error)
    }
}