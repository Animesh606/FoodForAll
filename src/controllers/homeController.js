const NGO = require('../models/NGOModel');

const getHomePage = (req, res) => {
    // console.log(req.cookies.access_token);
    if(req._id){
        res.status(200).render('home', {valid : true, user : req.user});
    }
    else{
        res.status(200).render('home', {valid : false});
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
        res.status(500).render('thank', {
            success : false,
            message : 'Something Went Wrong!',
            details : "Couldn't browse Scheme Page due to internal Server Error Please try again",
            url : '/scheme',
            button : 'Try again'
        });
    }
}
const getLogOutPage = (req, res) => {
    try {
        if(!req._id)
            throw new Error('Authentication Error');
        res.clearCookie('access_token');
        res.status(200).render('thank', {
            success : true,
            message : 'Logged Out Successfully!!',
            details : 'Your account Logged out successfully',
            url : '/',
            button : 'OK'
        });
    } catch (err) {
        res.status(403).render('thank', {
            success : false,
            message : err.message,
            details : 'User not logged in Signin first',
            url : '/login',
            button : 'Login'
        });
    }
}

module.exports = {getHomePage, getContactPage, getLoginPage, getSchemePage, getLogOutPage};