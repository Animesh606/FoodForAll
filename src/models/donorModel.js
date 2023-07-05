const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

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
    },
    totalAmount : {
        type : Number,
        default : 0
    },
    donations : [{
        tranId : {
            type : String,
            required : true,
            unique : true
        },
        NGOName : {
            type : String,
            required : true,
        },
        amount : {
            type : Number,
            required : true,
            min : 50
        }
    }]
})

donorSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

// Donor model creation 
const donor = mongoose.model('Donor', donorSchema);

module.exports = donor;