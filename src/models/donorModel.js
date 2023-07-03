const mongoose = require('mongoose');
const validator = require('validator');

// Donor schema define 
const donorSchema = new mongoose.Schema({
    firstName : {
        type : String,
        trim : true,
        uppercase : true,
        required : [true, 'First Name required'],
        minLength : 2
    },
    lastName : {
        type : String,
        trim : true,
        uppercase : true,
        required : [true, 'Last Name required'],
        minLength : 2
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
    password : {
        type : String,
        required : [true, 'Password required'],
        validate(val){
            if(!validator.isStrongPassword(val))
                throw new Error('Enter a Strong Password!');
        }
    }
})

// Donor model creation 
const donor = mongoose.model('Donor', donorSchema);

module.exports = donor;