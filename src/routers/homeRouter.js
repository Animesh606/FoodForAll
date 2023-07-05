// Import all modules required
const homeRouter = require('express').Router();
const homeController = require('../controllers/homeController');
const auth = require('../middlewares/auth');

// All route with get method 
homeRouter.get('/', auth, homeController.getHomePage);
homeRouter.get('/contact', homeController.getContactPage)
homeRouter.get('/login', homeController.getLoginPage);

// Export router
module.exports = homeRouter;