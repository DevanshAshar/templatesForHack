const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const User = require("../models/userSchema");
const Feedback = require("../models/feedback");
const nodemailer = require("nodemailer");
var cloudinary = require("cloudinary");

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});

const getAuth = async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    console.log(err);
  }
};

const getCloudinarySignature = async (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    cloudinaryConfig.api_secret
  );
  res.json({ timestamp, signature });
};

const newUser = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      country,
      socials,
      phoneNumber,
      role,
      firstName,
      lastName,
      public_id,
      version,
      signature,
      phoneNumberPrefix,
    } = req.body;
    const name = firstName + " " + lastName;
    const phone = phoneNumberPrefix + " " + phoneNumber;

    const userExist = await User.findOne({ username: username });
    const emailExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "Username is not unique" });
    }
    if (emailExist) {
      return res.status(400).json({ message: "Email is not unique" });
    }
    const expectedSignature = cloudinary.utils.api_sign_request(
      { public_id: public_id, version: version },
      cloudinaryConfig.api_secret
    );

    if (expectedSignature === signature) {
      const user = new User({
        username,
        password,
        email,
        country,
        role,
        socials,
        phoneNumber: phone,
        name,
        profilePicPublic_id: public_id,
      });
      await user.save();
      res.status(200).json({ message: "Successfully Registered" });
    } else {
      res.status(401).json({ message: "cloudinary signature is invalid" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userToBeChecked = await User.findOne({ email: email });
    if (userToBeChecked) {
      const passwordMatchOrNot = await bcrypt.compare(
        password,
        userToBeChecked.password
      );

      if (passwordMatchOrNot) {
        const token = await userToBeChecked.generateAuthToken();
        res.cookie("jsonwebtoken", token, {
          maxAge: 86400000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        return res
          .status(200)
          .json({ message: "Login successful", user: userToBeChecked });
      } else {
        return res.status(400).json({ message: "password did not match" });
      }
    } else {
      const emailToBeChecked = await User.findOne({ username: email });
      if (emailToBeChecked) {
        const passwordMatchOrNot = await bcrypt.compare(
          password,
          emailToBeChecked.password
        );
        if (passwordMatchOrNot) {
          const token = await emailToBeChecked.generateAuthToken();
          res.cookie("jsonwebtoken", token, {
            maxAge: 86400000,
            httpOnly: true,
            sameSite: "none",
            secure: true,
          });
          return res
            .status(200)
            .json({ message: "Login successful", user: emailToBeChecked });
        } else {
          return res.status(400).json({ message: "password did not match" });
        }
      } else {
        return res.status(400).json({ message: "no user exists" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(234).json({ message: "f" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("jsonwebtoken", { path: "/" });
  res.status(200).json({ message: "User logged out successfully" });
};

const feedback = async (req, res) => {
  try {
    const { subject, message } = req.body;
    const fdbk = {
      subject: subject,
      message: message,
      user: req.user._id,
    };
    var feedbk = await Feedback.create(fdbk);
    feedbk = await feedbk.populate("user", "-password");
    res.status(200).json({ message: feedbk });
  } catch (error) {
    console.log(error);
  }
};

const forgotPass = async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await User.findOne({ email: email });
    if (!userData) return res.status(400).json({ message: "no user found" });
    const otp = Math.floor(Math.random() * 10000);
    await User.findByIdAndUpdate(userData._id, {
      otp: otp,
      otpExpire: new Date().getTime() + 300 * 1000,
    });
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
      subject: "OTP for your account for <LOGO>",
      text: `OTP to reset password is ${otp}, Please ignore this message if you did not otp for this`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
    });
    res.status(200).json({ message: "OTP sent on registered email" });
  } catch (error) {
    console.log(error);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    let currentTime = new Date().getTime();
    const userData = await User.findOne({ email: email });
    let diff = userData.otpExpire - currentTime;
    if (diff < 0)
      return res.status(400).json({ message: "Time limit exceeded" });
    if (!otp) res.status(400).json({ error: "pls enter otp!!!" });
    else if (otp == userData.otp) {
      userData.password = "";
      return res.status(200).json({ message: "otp verified" });
    } else {
      return res.status(400).json({ message: "invalid otp" });
    }
  } catch (err) {
    console.log(err);
  }
};

const newPass = async (req, res) => {
  try {
    const { password, email } = req.body;
    const userData = await User.findOne({ email: email });
    if (!password)
      return res.status(400).json({ message: "pls enter details" });
    userData.password = password;
    await userData.save();
    res.status(200).json({ message: "password updated" });
  } catch (err) {
    console.log(err);
  }
};

const newProfilePic = async (req, res) => {
  try {
    const { newPfp } = req.body;
    if (!newPfp)
      return res.status(400).json({ message: "Enter a profile pic" });
    await User.findByIdAndUpdate(req.user._id, { profilePic: newPfp });
    res.status(200).json({ message: "Profile pic updated" });
  } catch (error) {
    console.log(error);
  }
};

const updatePass = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    if (!password)
      return res.status(400).json({ message: "Enter previous password" });
    const passwordMatch = await bcrypt.compare(password, req.user.password);
    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid previous password" });
    const user = req.user;
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password Updated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  newUser,
  loginUser,
  logout,
  feedback,
  forgotPass,
  verifyOtp,
  newPass,
  getAuth,
  newProfilePic,
  updatePass,
  getCloudinarySignature,
};
