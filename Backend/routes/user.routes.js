const express =require('express');

const router=express.Router();

const {body}=require('express-validator');
const userController=require('../controllers/user.controller');
const authmiddleware=require('../middleware/auth.middleware');

router.post('/register',[
    body('email').isEmail(),
    body('fullname.firstname').isLength({min:3,max:50}).withMessage('first name must be 3 to 50 characters'),
    body('password').isLength({min:6,max:50}).withMessage('password must be 6 to 50 characters')
],userController.registerUser)

router.post('/login',[
    body('email').isEmail(),
    body('password').isLength({min:6,max:50}).withMessage('password must be 6 to 50 characters')
],userController.loginUser)

router.get('/profile',authmiddleware.authUser,userController.getUserProfile)

router.get('/logout',userController.logoutUser)


module.exports=router