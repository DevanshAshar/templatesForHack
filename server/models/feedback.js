const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");

const feedbackSchema=new mongoose.Schema({
    subject:{
        type:String
    },
    message:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const Feedback=mongoose.model('Feedback',feedbackSchema)
module.exports=Feedback