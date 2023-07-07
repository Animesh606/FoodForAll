const NGO = require('../models/NGOModel');

const getHomePage = (req, res) => {
    // console.log(req.cookies.access_token);
    if(req._id){
        res.status(200).render('home', {
            login : 'none',
            profile : 'inline-block',
            user : req.user,
            name : req.firstName
        })
    }
    else{
        res.status(200).render('home', {
            login : 'inline-block',
            profile : 'none'
        });
    }
}
const getContactPage = (req, res) => {
    res.status(200).render('contact');
}
const getLoginPage = (req, res) => {
    res.status(200).render('loginpage');
}
const getSchemePage = async (req, res) => {
    try {
        const card = await NGO.find();
        res.status(200).render('schemes', {card})
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

module.exports = {getHomePage, getContactPage, getLoginPage, getSchemePage};