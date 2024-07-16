const mongoose = require('mongoose');
const validator = require('validator');
const { format } = require('date-fns');

const usersSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        validate:{
            validator:(val)=>{
                return validator.isEmail(val)
            },
            message:'email is not valid'
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    country:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    img:{
        type: String
    },
    date:{
        type: String,
        default: format(Date.now(), 'yyyy-MM-dd'),
    }
});

const Users = mongoose.model('users',usersSchema)

module.exports = Users;