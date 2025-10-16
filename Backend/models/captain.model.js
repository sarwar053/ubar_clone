const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const captainSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            
        },
        lastname: {
            type: String,
            required: true,
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email',
          ],
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status:{
        type: String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vhicle:{
        color:{
            type: String,
            required: true,
            minlength: 3,
        },
        plate:{
            type: String,
            required: true,
            minlength: [3, 'Plate number must be at least 3 characters long'],
        },
        capacity:{
            type: Number,
            required: true,
            min: 1
        },
        vechincalType:{
            type: String,
            required: true,
            enum: ['car','bus','truck']
        }
    },
    location:{
        lat:{
            type: Number,
            
        },
        lng:{
            type: Number
        }
    }
})

captainSchema.methods.generateAuthToken=function(){
    const token=jwt.sing({_id:this._id},process.env.JWT_PRIVATE_KEY,{expiresIn:'1d'});
    return token
}

captainSchema.methods.comparePassword=function(password){
    return bcrypt.compareSync(password,this.password);
}

captainSchema.statics.generateHashPassword=function(password){
    const hash=bcrypt.hashSync(password,10);
    return hash;
}

module.exports=mongoose.model('Captain',captainSchema);