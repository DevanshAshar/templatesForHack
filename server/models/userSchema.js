const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
const dotenv=require('dotenv').config()

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            },
        password: {
            type: String,
        },
        profilePic:{
            type:String
        },
        email:{
            type:String,
        },
        country:{
            type:String
        },
        name:{
            type:String
        },
        phoneNumber:{
            type:String
        },
        otp:{type:Number},
        otpExpire:{type:Number}
    },{timestamps:true}
    )

userSchema.pre("save", async function (next) {
        if (this.isModified("password")) {
            this.password = bcrypt.hash(this.password,Number(process.env.SALT));
        }
        next()
    })
    
const User=mongoose.model('User',userSchema)
module.exports=User