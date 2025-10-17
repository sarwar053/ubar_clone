const captainModel=require('../models/captain.model');

const captainService=require('../services/captain.service');
const {validationResult}=require('express-validator');

module.exports.registerCaptain=async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }
    
    const {fullname,email,password,vehicle}=req.body;

    if(await captainModel.findOne({email})){
        return res.status(400).json({errors:[{msg:'email already exists'}]});
    }

    const hashedPassword=await captainModel.generateHashPassword(password);
    const captain=await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });
    const token=captain.generateAuthToken();

    return res.status(201).json({token,captain});
    
}