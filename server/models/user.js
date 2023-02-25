const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
const dotenv=require('dotenv').config()

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            unique:[true,'username already exists']
            },
        password: {
            type: String,
            minlength: [8, "Password must contain minimum 8 characters"],
        },
        image:[{
            type:String
        }],
        email:{
            type:String,
            required:true,
            unique:[true,'email-id exists'],
            lowercase:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Invalid Email-Id')
                }
            }
        },
        otp:{type:Number},
        otpExpire:{type:Number}
    },{timestamps:true}
    )

userSchema.pre("save", async function (next) {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, process.env.SALT);
        }
        next()
    })
const User=mongoose.model('User',userSchema)
module.exports=User