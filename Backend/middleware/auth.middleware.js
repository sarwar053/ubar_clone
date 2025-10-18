const userModel=require('../models/user.model');
const blacklistTokenModel=require('../models/blacklistToken.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const captainModel=require('../models/captain.model');

module.exports.authUser=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }
    const isblacklisted=await blacklistTokenModel.findOne({token});
    if(isblacklisted){
        return res.status(401).json({message:'Unauthorized'});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_PRIVATE_KEY);
        const user=await userModel.findById(decoded._id);
        if(!user){
            return res.status(401).json({message:'Unauthorized'});
        }
        req.user=user;
        next();
    }catch(err){
        return res.status(401).json({message:'Unauthorized'});
    }
}

module.exports.authCaptain=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }
    const isblacklisted=await blacklistTokenModel.findOne({token});
    if(isblacklisted){
        return res.status(401).json({message:'Unauthorized'});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_PRIVATE_KEY);
        const captain=await captainModel.findById(decoded._id);
        if(!captain){
            return res.status(401).json({message:'Unauthorized'});
        }
        req.captain=captain;
        next();
    }catch(err){
        return res.status(401).json({message:'Unauthorized'});
    }
    
    
}