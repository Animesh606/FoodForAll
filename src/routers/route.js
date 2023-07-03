// Import all modules required
const router = require('express').Router();
const donorController = require('../controllers/donorController');
const NGOController = require('../controllers/NGOController');
const homeController = require('../controllers/homeController');

// All route with get method 
router.get('/', homeController.getHomePage);
router.get('/contact', homeController.getContactPage)
router.get('/login', homeController.getLoginPage);
router.get('/donor/registration', donorController.getRegistrationPage);
// router.get('/donor/login', donorController.getLoginPage);
router.get('/NGO/registration', NGOController.getRegistrationPage);
// router.get('/NGO/login', NGOController.getLoginPage);

// All route with post method 
router.post('/donor/registration', donorController.createDetails);
router.post('/donor/login', donorController.getUser);
router.post('/NGO/registration', NGOController.createDetails);
router.post('/NGO/login', NGOController.getUser);

module.exports = router;