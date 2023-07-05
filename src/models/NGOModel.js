const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

// NGO schema define 
const NGOSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        uppercase : true,
        required : [true, 'First Name required'],
        minLength : 2
    },
    address : {
        type : String,
        trim : true,
        required : [true, 'Address required'],
    },
    email : {
        type : String,
        lowercase : true,
        required : [true, 'Email id required'],
        unique : [true, 'Email id already exist!!'],
        validate(val){
            if(!validator.isEmail(val))
                throw new Error('Invalid Email Id');
        }
    },
    phone : {
        type : String,
        required : [true, 'Phone no required'],
        unique : true,
        minlength : 10,
        maxlength : 10
    },
    govId : {
        type : String,
        trim : true,
        required : true,
        unique : true,
        minLength : 11
    },
    password : {
        type : String,
        required : [true, 'Password required'],
        validate(val){
            if(!validator.isStrongPassword(val))
                throw new Error('Enter a Strong Password!');
        }
    }
})

NGOSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

// Donor model creation 
const NGO = mongoose.model('NGO', NGOSchema);

module.exports = NGO;