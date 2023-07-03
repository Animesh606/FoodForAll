// Import all modules required
require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const path = require('path');
require('./db/connect');
const homeRouter = require('./routers/homeRouter');
const NGORouter = require('./routers/NGORouter');
const donorRouter = require('./routers/donorRouter');

// Initialize variables
const app = express();
const port = process.env.PORT;

// Define all paths require 
const staticPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Connect all component and set all required values 
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialPath);
app.use(express.urlencoded({extended : false}));
app.use('/', express.static(staticPath));
app.use(homeRouter);
app.use(donorRouter);
app.use(NGORouter);

// Listening to the server 
app.listen(port, () => {
    console.log(`server running on http://127.0.0.1:${port}`);
})