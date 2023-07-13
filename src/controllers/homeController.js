const NGO = require('../models/NGOModel');
const donor = require('../models/donorModel');

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
const getNGOPage = async (req, res) => {
    try {
        const user = await NGO.findById(req.params.id);
        if(!user)
            throw new Error('NGO not found!');
        res.status(200).render('NGO', user);
    } catch (err) {
        res.status(400).render('thank', {
            success : false,
            message : 'Something went wrong',
            details : err.message,
            url : '/scheme',
            button : 'Try again'
        });
    }
}
const getQR = async (req, res) => {
    try {
        if(!req._id || req.user != 'donor')
            return res.status(403).redirect('/login');
        const user = await NGO.findById(req.params.id);
        if(!user)
            throw new Error('NGO not found!');
        res.status(200).render('qr', user);
    } catch (error) {
        res.status(404).send(error.message);
    }
}
const getpayForm = async (req, res) => {
    try {
        if(!req._id || req.user != 'donor')
            return res.status(403).redirect('/login');
        const user = await donor.findById(req._id);
        const ngo = await NGO.findById(req.params.id);
        if(!ngo)
            throw new Error('NGO not found!');
        res.status(200).render('paymentInfo', {user, ngo});
    } catch (error) {
        res.status(404).send(error.message);
    }
}
const uploadDonation = async (req, res) => {
    try {
        if(!req._id || req.user != 'donor')
            return res.status(403).redirect('/login');
        const user = await donor.findById(req._id);
        const ngo = await NGO.findById(req.body.ngoId);
        if(!ngo)
            throw new Error('NGO not found!');
        const amount = Number(req.body.amount);
        user.donations.push({
            tranId : req.body.tranId,
            NGOName : ngo.name,
            NGOId : ngo._id,
            amount : amount,
            date : req.body.date
        });
        ngo.donations.push({
            tranId : req.body.tranId,
            name : `${user.firstName} ${user.lastName}`,
            email : user.email,
            amount : amount,
            date : req.body.date
        });
        user.totalAmount += amount;
        ngo.fund += amount;
        await user.save();
        await ngo.save();
        res.status(200).render('thank', {
            success : true,
            message : 'Thank You',
            details : `Congratulations! You have donated a total amount of ${user.totalAmount}`,
            url : `/NGO/${ngo._id}`,
            button : 'Ok'
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {getHomePage, getContactPage, getLoginPage, getSchemePage, getLogOutPage, getNGOPage, getQR, getpayForm, uploadDonation};