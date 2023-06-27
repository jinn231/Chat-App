const { Server } = require("socket.io");
const { errorHandler } = require("./errorHandler");
let io;

const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000",
    methods: ['GET','POST','PUT','DELETE']
}

module.exports = {
    init: (httpServer) => {
        io = new Server(httpServer, {
            cors: corsOptions
        });
        return io;
    },
    getIo: () => {
        if(!io){
            errorHandler(400, "Connection timeout.")
        }
        return io;
    }
}