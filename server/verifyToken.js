const { errorHandler } = require("./errorHandler");

const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    
    const token = req.cookies.access_cookie;

    try {
        
        jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
            if(err) errorHandler(401, "Token is not valid !")
            req.userId = data.userId
            next()
        })
    } catch (error) {
        next(error)
    }
}