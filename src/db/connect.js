const mongoose = require('mongoose');

// Connect Database with Serber 
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DATABASE}`).then(() => {
    console.log('connection successful');
}).catch((err) => {
    console.log(err);
})