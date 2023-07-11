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
                phone : req.body.phone,
                address : req.body.address,
                city : req.body.city,
                state : req.body.state,
                profession : req.body.profession,
                password : req.body.password
            });
            const result = await user.save();
            res.status(201).render('thank', {
                success : true,
                message : 'Registration Successful!',
                details : 'You may Login with your email id and password now.',
                url : '/login',
                button : 'Ok'
            });
        }
        else
            throw new Error('Password not match');
    } catch(err) {
        if(err.code == 11000)
            res.status(400).render('thank', {
                success : false,
                message : 'User already exists',
                details : 'Email or Contact no. already exists.',
                url : '/login',
                button : 'Login'
            });
        else
            res.status(400).render('signin', err);
        // if(err.errors){
        //     if(err.errors.firstName)
        //         res.status(400).write(err.errors.firstName.message);
        //     if(err.errors.lastName)
        //         res.status(400).write(err.errors.lastName.message);
        //     if(err.errors.email)
        //         res.status(400).write(err.errors.email.message);
        //     if(err.errors.password)
        //         res.status(400).write(err.errors.password.message);
        //     res.status(400).send();
        // }
        // else if(err.code == 11000){
        //     res.status(400).send('User already Exist');
        // }
        // else{
        //     console.log(err.message);
        //     res.status(400).send(err.message);
        // }
    }
}
const getUser = async (req, res) => {
    try {
        const username = await donor.findOne({email : req.body.email});
        if(!username)
            throw new Error('Invalid UserDetails!');
        const match = await bcrypt.compare(req.body.password, username.password);
        if(match){
            const token = jwt.sign({_id : username._id, user : 'donor'}, process.env.SECRET_KEY);
            res.cookie('access_token', token, {
                expires : new Date(Date.now() + 600000),
                httpOnly : true
            })
            res.status(201).render('thank', {
                success : true,
                message : 'Login Successful!',
                details : 'Congratulations!, You are successfully logged in to your account.',
                url : '/',
                button : 'Ok'
            });
        }
        else
            throw new Error('Invalid UserDetails!');
    } catch (err) {
        res.status(400).render('thank', {
            success : false,
            message : err.message,
            details : 'Fill Correct Details or make sure user already registered',
            url : '/login',
            button : 'Ok'
        });
    }
}
const getProfilePage = async (req, res) => {
    try {
        const user = await donor.findOne({_id : req._id});
        if(!user)
            throw new Error('Authentication Error!!');
        res.status(200).render('profile', user);
    } catch (err) {
        res.status(403).render('thank', {
            success : false,
            message : err.message,
            details : 'Make sure your account is logged in!',
            url : '/login',
            button : 'Login'
        });
    }
}

module.exports = {getRegistrationPage, getLoginPage, createDetails, getUser, getProfilePage};