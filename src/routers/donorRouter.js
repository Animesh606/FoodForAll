// Import all modules required
const donorRouter = require('express').Router();
const donorController = require('../controllers/donorController');
const auth = require('../middlewares/auth');

// All route with get method 
donorRouter.get('/donor/registration', donorController.getRegistrationPage);
donorRouter.get('/donor/login', donorController.getLoginPage);
donorRouter.get('/donor/profile', auth, donorController.getProfilePage);

// All route with post method 
donorRouter.post('/donor/registration', donorController.createDetails);
donorRouter.post('/donor/login', donorController.getUser);

// All route with delete method
donorRouter.delete('/donor/login', auth, donorController.logOut);

// Export router
module.exports = donorRouter;