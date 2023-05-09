const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jsonwebtoken;
    if (!token) {
      res.status(400).json({ message: "Login First" });
    } else {
      const decryptedPayload = jwt.verify(token, process.env.SECRET_KEY);
      const userData = await User.findOne({
        _id: decryptedPayload._id,
      });
      if (!userData) {
        throw new Error("user not found");
      }
      req.user = userData;
      next();
    }
    // const decryptedPayload = jwt.verify(
    //     token,
    //     process.env.SECRET_KEY
    // )

    // const a= jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ5NzgyZWMxYzZiYjg4NmRlYjgyMmQiLCJpYXQiOjE2ODI1Mzk2Mzl9._v1oMMRxDBx_cle8Zj4UlbSt6oYMQ3t19NDjE7MtLiA",            process.env.SECRET_KEY
    // )
    // console.log(a)
    // console.log(decryptedPayload)

    // const userData = await User.findOne({
    //     _id: decryptedPayload._id,
    // });

    // if (!userData) {
    //     throw new Error("user not found")
    // }

    // req.user = userData;
    // next();
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = authenticate;
