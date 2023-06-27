const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000",
}

const io = require("socket.io")(8000,{
    cors: corsOptions
});

// user = [{userId: "1234", socketId: "1234"}]
let users = [];

const addUser = (userId, socketId) => {
    if(!users.some(user => user.userId === userId)){
        users.push({userId, socketId})
    }
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId )
}

io.on("connection", (socket) => {
    socket.on("Add-user", (user) => {
        addUser(user, socket.id)
        io.emit("Get-User", users)
    })

    socket.on("disconnect", () => {
        removeUser(socket.id);
        io.emit("Get-User", users)
    })

    socket.on("send-message", ({sender, receiverId, message, conversationId}) => {
        const user = getUser(receiverId);
        
        if(user){
            io.to(user.socketId).emit("get-message", {
                senderId: sender,
                message: message,
                conversationId
            })
        }
    })

    socket.on("start-conversation", (data) => {
        const user = getUser(data.members[1]);
        console.log(data)
        console.log(user)
        if(user){
            io.to(user.socketId).emit("start-conversation-noti",data)
        }
    })
})