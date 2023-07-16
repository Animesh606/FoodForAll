const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// cloudinary cloud configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.api_secret 
});

// Creating a temporary folder to store uploaded photo
const filepath = path.join(__dirname, '../../public/uploads');
if(!fs.existsSync(filepath))
    fs.mkdirSync(filepath);