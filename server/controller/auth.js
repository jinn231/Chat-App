const User = require("./../model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {errorHandler} = require("./../errorHandler")

exports.SignIn = async (req, res, next) => {
    try {
        const user = await User.findOne({ email:req.body.email })

        if(!user) errorHandler(404, "User with this email not found!")

        const isAuth = await bcrypt.compare(req.body.password, user.password)

        if(!isAuth) errorHandler(401, "Invalid email or password!")

        const {password, ...other} = user._doc;
        
        const token = await jwt.sign({
            userId: user._id
        }, process.env.SECRET_KEY)

        res.cookie("access_cookie", token, {
            httpOnly: true,
            maxAge: 10080 * 60 * 1000
        })
        .status(200)
        .json({
            user: other
        })
    } catch (error) {
        next(error)
    }
}

exports.SignUp = async (req, res, next) => {
    try {

        const isUserExist = await User.findOne({ email: req.body.email });

        if(isUserExist) errorHandler(401, "User with this email already exists.")

        const pass = await bcrypt.hash(req.body.password, 12);

        const user = new User({...req.body, password: pass});
        await user.save();

        const {password, ...other} = user._doc;

        const token = await jwt.sign({
                        userId: user._id
                    }, process.env.SECRET_KEY)

        res.cookie("access_cookie", token, {
            httpOnly: true,
            maxAge: 10080 * 60 * 1000
        })
        .status(200)
        .json({
            user: other
        })

    } catch (error) {
        next(error)
    }

}

exports.signInWithGoogle = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(user){
            const token = jwt.sign({ userId: user._id}, process.env.SECRET_KEY);
    
            res.cookie("access_cookie", token, {
                httpOnly: true,
                maxAge: 10080 * 60 * 1000
            })
            .status(200).json(user)
        }else{
            const user = new User({...req.body})

            await user.save();
            
            const token = await jwt.sign({
                userId: user._id
            }, process.env.SECRET_KEY)

            res
            .cookie("access_cookie", token, {
                httpOnly: true,
                maxAge: 10080 * 60 * 1000
            })
            .status(200).json(user)

        }
    } catch (error) {
        next(error)
    }
}