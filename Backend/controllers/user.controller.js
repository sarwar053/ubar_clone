const userModel = require('../models/user.model');
const userservice = require('../services/user.service');
const blacklistTokenModel = require('../models/blacklistToken.model');

const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res) => {

    try {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ errors: erros.array() });
        }
        const { fullname, email, password } = req.body;


        if (await userModel.findOne({ email })) {
            return res.status(400).json({ errors: [{ msg: 'email already exists' }] });
        }

        const hashedPassword = await userModel.generateHashPassword(password);


        const user = await userservice.createUser({ firstname: fullname.firstname, lastname: fullname.lastname, email, password: hashedPassword });

        const token = await user.generateAuthToken();


        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            
        })



        return res.status(201).json({ token, user })

    } catch (err) {
        return res.status(400).json({ errors: [{ msg: err.message }] });
    }


}

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
    }
    const ismatch = await user.comparePassword(password);
    if (!ismatch) {
        return res.status(401).json({ errors: [{ msg: 'invalid credentials' }] });
    }
    const token = await user.generateAuthToken();
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        
    })
    return res.status(200).json({ token, user })
}

module.exports.getUserProfile = async (req, res) => {

    return res.status(200).json({ user: req.user })
}

module.exports.logoutUser = async (req, res) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    const blacklistToken = new blacklistTokenModel({ token });
    await blacklistToken.save();
    return res.status(200).json({ message: 'logout successfully' })

}