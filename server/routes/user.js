const express = require("express");
const router = new express.Router();
const authenticate=require('../middlewares/auth')
const {
    newUser,
    loginUser,
    logout,
    feedback,
    forgotPass,
    verifyOtp,
    newPass
}=require('../controllers/user');
const { Router } = require("express");

router.post('/newUser',newUser)
router.post('/loginUser',loginUser)
router.get('/logout',logout)
router.post('/feedback',authenticate,feedback)
router.post('/forgotPass',forgotPass)
router.post('/verifyOtp',verifyOtp)
router.post('/newPass',newPass)
module.exports=router