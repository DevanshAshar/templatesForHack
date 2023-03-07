const jwt = require("jsonwebtoken");
const User = require('../models/userSchema')

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jsonwebtoken;
        console.log('1')
        if (!token) {
            res.status(400).json({ message: 'Login First' })
        }
        console.log('2')
        const decryptedPayload = jwt.verify(
            token,
            process.env.SECRET_KEY
        )
        console.log(decryptedPayload)
        
        const userData = await User.findOne({
            _id: decryptedPayload._id,
        });

        if (!userData) {
            throw new Error("user not found")
        }

        req.user = userData;
        next();
    } catch (err) {
        console.log(err)
    }
};

module.exports = authenticate;


