const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const SecretKey = process.env.SECRET_KEY
const User=require('../models/user')
const Feedback=require('../models/feedback')
const nodemailer=require('nodemailer')
const newUser = async (req, res) => {
    try {
        const { username, password,email} = req.body;
        if (!username || !password || !email)
            return res
                .status(400)
                .json({ message: "Please fill the necessary details " });
        const user = new User(req.body);

        await user.save();
        const token = jwt.sign({ username: req.body.username }, SecretKey);
        res.cookie("jsonwebtoken", token, {
            maxAge: 604800000,
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        res.status(200).json({
            message: "Successfully Registered",
            user,
            token,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

       
        if (!username || !password)
            return res
                .status(400)
                .json({ message: "Please fill the necessary details " });

        const userData = await User.findOne({ username: req.body.username });

        if (!userData)
            return res.status(400).json({ message: "User not found" });
        const validPassword = await bcrypt.compare(
            req.body.password,
            userData.password
        );
        if (!userData || !validPassword)
            res.status(400).json({ message: "Invalid credentials" });
        else {
            const token = jwt.sign({ username: req.body.username }, SecretKey);
            res.cookie("jsonwebtoken", token, {

                maxAge: 604800000,

                httpOnly: true,
                sameSite: "none",
                secure: true,
            });

            return res.status(200).json({ userData, token });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    res.clearCookie("jsonwebtoken", { path: "/" });
    res.status(200).json({ message: "User logged out successfully" });
};

const feedback=async(req,res)=>{
    try {
        const {subject,message}=req.body
        const fdbk={
            subject:subject,
            message:message,
            user:req.user._id
        }
        var feedbk=await Feedback.create(fdbk)
        feedbk=await feedbk.populate("user","-password")
        res.status(200).json({message:feedbk})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const forgotPass = async (req, res) => {
    const { email } = req.body;

    try {
        const userData = await User.findOne({ email: req.body.email });
        if (!userData)
            return res.status(400).json({ message: "no user found" });
        const otp = Math.floor(Math.random()*10000);
        await User.findByIdAndUpdate(userData._id, { otp: otp,otpExpire:new Date().getTime()+(300*1000)});
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        });
        var mailOptions = {
            from: "try.user99@gmail.com",
            to: userData.email,
            subject: "OTP for your account ",
            text: `OTP to reset password is ${otp}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
        });
        res.status(200).json({ message: "OTP sent on registered email" });
    } catch (error) {
        res.status(400).json(error.message);
    }
};
const verifyOtp = async (req, res) => {
    try {
        const { otp, email } = req.body;
        let currentTime=new Date().getTime()
        const userData = await User.findOne({ email: email });
        let diff=userData.otpExpire-currentTime
        if(diff<0)
        return res.status(400).json({message:'Time limit exceeded'})
        if (!otp) res.status(400).json({ error: "pls enter otp!!!" });
        else if (otp == userData.otp) {
            userData.password = "";
            return res.status(200).json({ message: "otp verified" });
        } else {
            return res.status(400).json({ message: "invalid otp" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const newPass = async (req, res) => {
    try {
        const { password, cpassword, email } = req.body;
        const userData = await User.findOne({ email: email });
        if (!password || !cpassword)
            return res.status(400).json({ message: "pls enter details" });
        if (password != cpassword)
            return res
                .status(400)
                .json({ message: "password and confirm password dont match" });
        userData.password = password;
        await userData.save();
        res.status(200).json({ message: "password updated" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
module.exports = {
    newUser,
    loginUser,
    logout,
    feedback,
    forgotPass,
    verifyOtp,
    newPass
};