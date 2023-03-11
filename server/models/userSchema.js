const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        profilePic: {
            type: String
        },
        email: {
            type: String,
        },
        country: {
            type: String
        },
        name: {
            type: String
        },role:{
            type:String
        },
        phoneNumber: {
            type: String
        },
        socials:{
            type:String
        },
        otp: { type: Number },
        otpExpire: { type: Number }
    }, { timestamps: true }
)

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.secret_key)
        return token
    } catch (err) {
        console.log(err)
    }
}


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, Number(process.env.SALT));
    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User