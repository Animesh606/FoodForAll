// Import all modules required
const donorRouter = require('express').Router();
const donorController = require('../controllers/donorController');

// All route with get method 
donorRouter.get('/donor/registration', donorController.getRegistrationPage);
donorRouter.get('/donor/login', donorController.getLoginPage);

// All route with post method 
donorRouter.post('/donor/registration', donorController.createDetails);
donorRouter.post('/donor/login', donorController.getUser);

// Export router
module.exports = donorRouter;