const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname:{
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        lastname: {
            type: String,
            minlength: 3,
            maxlength: 50
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }

});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1d' });
    return token;
}

userSchema.statics.generateHashPassword = function(password) {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
}
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;