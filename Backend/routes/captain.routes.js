
const express=require('express');

const router=express.Router();
const {body}=require('express-validator');

const captainController=require('../controllers/captain.controller');

router.post('/register',[
    body('email').isEmail(),
    body('fullname.firstname').isLength({min:3,max:50}).withMessage('first name must be 3 to 50 characters'),
    body('password').isLength({min:6,max:50}).withMessage('password must be 6 to 50 characters'),
    body('vehicle.color').isLength({min:3,max:50}).withMessage('color must be 3 to 50 characters'),
    body('vehicle.plate').isLength({min:3,max:50}).withMessage('plate must be 3 to 50 characters'),
    body('vehicle.capacity').isInt(min=1,max=10).withMessage('capacity must be 1 to 10'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('vehicle type must be car,motorcycle or auto')
],captainController.registerCaptain)

module.exports=router