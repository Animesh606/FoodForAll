const bcrypt = require('bcrypt');
const donor = require('../models/donorModel');

const getRegistrationPage = (req, res) => {
    res.status(200).render('signin');
}
const getLoginPage = (req, res) => {
    res.status(200).render('loginpage');
}
const createDetails = async (req, res) => {
    try {
        password = await bcrypt.hash(req.body.password, 10);
        const user = new donor({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            password : password
        });
        const result = await user.save();
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(400).send('Error occur');
    }
}
const getUser = (req, res) => {
    res.send('get donor');
}

module.exports = {getRegistrationPage, getLoginPage, createDetails, getUser};