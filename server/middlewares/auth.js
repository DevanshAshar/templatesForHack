const jwt = require("jsonwebtoken");
const User=require('../models/user')
const authenticate = async (req, res, next) => {
    try {
        const token=req.cookies.jsonwebtoken;
        //const token=req.header('AuthenticateUser')
        if (!token) {
            res.status(400).json({message:'Login First'})
        }
        
        const decryptedPayload = jwt.verify(
            token,
            process.env.SECRET_KEY
        );
        
        const userData = await User.findOne({
            username: decryptedPayload.username,
        });
        if (!userData) {
            res.status(400).json({message:'User Not Found'})
        }
        
        req.user = userData;
        next();
    } catch (err) {
        res.status(400).json({
            error: "Authorization not given",
            message: err.message,
        });
    }
};

module.exports = authenticate;