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
    newPass,
    getAuth,
    newProfilePic,
    updatePass,
    imageUploading
}=require('../controllers/userController');


router.get("/getAuth",authenticate,getAuth)
router.get('/logout',authenticate,logout)
router.post('/feedback',authenticate,feedback)

router.post('/loginUser',loginUser)
router.post('/newUser',newUser)
router.post('/forgotPass',forgotPass)
router.post('/verifyOtp',verifyOtp)
router.post('/newPass',newPass)
router.patch('/newProfilePic',authenticate,newProfilePic)
router.patch('/updatePass',authenticate,updatePass)
router.post("/imageUploading",imageUploading)

module.exports=router