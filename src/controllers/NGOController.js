const NGO = require('../models/NGOModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getRegistrationPage = (req, res) => {
    res.status(200).render('regisNGO');
}
const getLoginPage = (req, res) => {
    res.status(200).render('tempNGOlogin');
}
const createDetails = async (req, res) => {
    try {
        if(req.body.password === req.body.cpassword){
            const user = new NGO({
                name : req.body.name,
                address : req.body.address,
                email : req.body.email,
                phone : req.body.phone,
                govId : req.body.govId,
                city : req.body.city,
                state : req.body.state,
                password : req.body.password
            });
            const result = await user.save();
            res.status(201).send(result);
        }
        else
            res.status(400).send('Password not match');
    } catch(err) {
        if(err.errors){
            if(err.errors.name)
                res.status(400).write(err.errors.name.message);
            if(err.errors.address)
                res.status(400).write(err.errors.address.message);
            if(err.errors.email)
                res.status(400).write(err.errors.email.message);
            if(err.errors.phone)
                res.status(400).write(err.errors.phone.message);
            if(err.errors.govId)
                res.status(400).write(err.errors.govId.message);
            if(err.errors.password)
                res.status(400).write(err.errors.password.message);
            if(err.errors.city)
                res.status(400).write(err.errors.city.message);
            if(err.errors.state)
                res.status(400).write(err.errors.state.message);
            res.status(400).send();
        }
        else if(err.code == 11000){
            console.log(err);
            res.status(400).send('Organisation already Exist');
        }
        else{
            console.log(err.message);
            res.status(400).send(err.message);
        }
    }
}
const getUser = async (req, res) => {
    try {
        const username = await NGO.findOne({email : req.body.email});
        if(!username)
            throw new Error('Invalid UserDetails');
        const match = await bcrypt.compare(req.body.password, username.password);
        if(match){
            const token = jwt.sign({_id : username._id, firstName : username.name, user : 'NGO'}, process.env.SECRET_KEY);
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
        const user = await NGO.findOne({_id : req._id});
        if(!user)
            throw new Error('Authentication Error!!');
        res.status(200).send(user);
    } catch (err) {
        console.log(err.message);
        res.status(403).redirect('/NGO/login');
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