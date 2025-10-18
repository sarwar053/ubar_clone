const captainModel = require('../models/captain.model');

const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    if (await captainModel.findOne({ email })) {
        return res.status(400).json({ errors: [{ msg: 'email already exists' }] });
    }

    const hashedPassword = await captainModel.generateHashPassword(password);
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });
    const token = captain.generateAuthToken();
    res.cookie('token', token);
    return res.status(201).json({ token, captain });

}


module.exports.loginCaptain = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
    }
    const ismatch = await captain.comparePassword(password);
    if (!ismatch) {
        return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token);
    return res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res) => {
    return res.status(200).json({ captain: req.captain });
}
module.exports.logoutCaptain=async(req,res)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    const blacklistToken=new blacklistTokenModel({token});
    await blacklistToken.save();
    return res.status(200).json({message:'logout successfully'})
}