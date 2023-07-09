const donor = require('../models/donorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getRegistrationPage = (req, res) => {
    res.status(200).render('signin');
}
const getLoginPage = (req, res) => {
    res.status(200).render('templogin');
}
const createDetails = async (req, res) => {
    try {
        if(req.body.password === req.body.cpassword){
            const user = new donor({
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                password : req.body.password
            });
            const result = await user.save();
            res.status(201).send(result);
        }
        else
            res.status(400).send('Password not match');
    } catch(err) {
        if(err.errors){
            if(err.errors.firstName)
                res.status(400).write(err.errors.firstName.message);
            if(err.errors.lastName)
                res.status(400).write(err.errors.lastName.message);
            if(err.errors.email)
                res.status(400).write(err.errors.email.message);
            if(err.errors.password)
                res.status(400).write(err.errors.password.message);
            res.status(400).send();
        }
        else if(err.code == 11000){
            res.status(400).send('User already Exist');
        }
        else{
            console.log(err.message);
            res.status(400).send(err.message);
        }
    }
}
const getUser = async (req, res) => {
    try {
        const username = await donor.findOne({email : req.body.email});
        if(!username)
            throw new Error('Invalid UserDetails');
        const match = await bcrypt.compare(req.body.password, username.password);
        if(match){
            const token = jwt.sign({_id : username._id, firstName : username.firstName, user : 'donor'}, process.env.SECRET_KEY);
            res.cookie('access_token', token, {
                expires : new Date(Date.now() + 120000),
                httpOnly : true
            })
            res.status(201).send('Login Successful!');
        }
        else
            throw new Error('Invalid Password!!');
    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
}
const getProfilePage = async (req, res) => {
    try {
        const user = await donor.findOne({_id : req._id});
        if(!user)
            throw new Error('Authentication Error!!');
        res.status(200).render('profile', user);
    } catch (err) {
        console.log(err.message);
        res.status(403).redirect('/donor/login');
    }
}
const logOut = (req, res) => {
    try {
        if(!req._id)
            throw new Error('Authentication Error');
        res.clearCookie('access_token');
        res.status(200).send('Logged Out Successfully!!');
    } catch (err) {
        console.log(err.message);
        res.status(403).send(err.message);
    }
}

module.exports = {getRegistrationPage, getLoginPage, createDetails, getUser, getProfilePage, logOut};