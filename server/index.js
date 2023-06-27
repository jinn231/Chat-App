require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const Auth_Router = require("./router/auth")
const User_Router = require("./router/user")
const Conversation_Router = require("./router/conversation")
const Message_Router = require("./router/message")
const multer = require("multer");
const path = require("path")

const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000",
    methods: ['GET','POST','PUT','DELETE']
}

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" +file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg"){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

app.use(multer({storage: Storage, fileFilter: fileFilter }).single("img"))
app.use("/images", express.static(path.join(__dirname, "images")))
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/api/auth", Auth_Router)
app.use("/api/users",User_Router)
app.use("/api/conversation",Conversation_Router)
app.use("/api/message",Message_Router)

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message;
    res.status(status).json({
        statusCode: status,
        message
    })
})

mongoose.connect(process.env.MONGO_URL)
.then(res => {
    console.log("Sever is COnnected.")
    app.listen(process.env.PORT)

})
.catch(err => {
    console.log(err)
})

