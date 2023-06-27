const {errorHandler} = require("./../errorHandler")
const User = require("./../model/User")
const path = require("path");
const fs = require("fs")

exports.getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId)

        if(!user) errorHandler(404, "User Not Found!")

        const {password, ...others} = user._doc;
        
        res.status(200).json({
            user: others
        })

    }catch(err){
        next(err)
    }
}

exports.getUserInformattion = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId)

        if(!user) errorHandler(404, "User not found!")

        const {password, ...others} = user._doc

        res.status(200).json({
            user: others
        })

    } catch (error) {
        next(error)
    }
}

exports.getUserByName = async (req, res, next) => {
    try {
        console.log("first");
        const username = req.query.n;

        const users = await User.find({
            name: {$regex: new RegExp(username, "i")},
        });

        const result = [];
        users.map(user => {
            const {password, ...others} = user._doc

            result.push(others)
        })

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.getUserByEmail = async (req, res, next) => {
    try {
        const email = req.query.e;

        const users = await User.find({
            email: {$regex: new RegExp(email, "i")},
        });

        const result = [];
        users.map(user => {
            const {password, ...others} = user._doc

            result.push(others)
        })

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.updateData = async (req,res,next) => {
    try {
        const {bio, phone} = req.body;

        const img = req.file;

        const isUser = await User.findById(req.userId)

        if(img && isUser.image){
            const filePath = path.join(__dirname, "..", isUser.image); // Replace with the actual path to your file

            fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err}`);
                return;
            }
        })
        }

        const user = await User.findByIdAndUpdate(req.userId, {
            bio: bio && bio,
            phone: phone && phone,
            image: img?.path
        })

        if(!user) errorHandler(404, "No User Found!")

        const {password, ...others} = user._doc;

        res.status(201).json(others)

    } catch (error) {
        next(error)
    }
}