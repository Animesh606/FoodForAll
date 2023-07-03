// Import all modules required
const NGORouter = require('express').Router();
const NGOController = require('../controllers/NGOController');

// All route with get method 
NGORouter.get('/NGO/registration', NGOController.getRegistrationPage);
NGORouter.get('/NGO/login', NGOController.getLoginPage);

// All route with post method 
NGORouter.post('/NGO/registration', NGOController.createDetails);
NGORouter.post('/NGO/login', NGOController.getUser);

// Export router
module.exports = NGORouter;