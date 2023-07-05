const donor = require('../models/donorModel');

const getRegistrationPage = (req, res) => {
    res.status(200).render('signin');
}
const getLoginPage = (req, res) => {
    res.status(200).render('loginpage');
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
            console.log(err);
            res.status(400).send(err);
        }
    }
}
const getUser = (req, res) => {
    res.send('get donor');
}

module.exports = {getRegistrationPage, getLoginPage, createDetails, getUser};