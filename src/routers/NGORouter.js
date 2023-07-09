// Import all modules required
const NGORouter = require('express').Router();
const NGOController = require('../controllers/NGOController');
const auth = require('../middlewares/auth');

// All route with get method 
NGORouter.get('/NGO/registration', NGOController.getRegistrationPage);
// NGORouter.get('/NGO/login', NGOController.getLoginPage);
NGORouter.get('/NGO/profile', auth, NGOController.getProfilePage);

// All route with post method 
NGORouter.post('/NGO/registration', NGOController.createDetails);
NGORouter.post('/NGO/login', NGOController.getUser);

// All route with delete method
NGORouter.delete('/NGO/login', auth, NGOController.logOut);

// Export router
module.exports = NGORouter;