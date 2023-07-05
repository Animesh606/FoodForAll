const mongoose = require('mongoose');
const db = `mongodb+srv://${process.env.CLOUD}@cluster0.lhs6gbm.mongodb.net/?retryWrites=true&w=majority`;
// Connect Database with Serber 
mongoose.connect(db).then(() => {
    console.log('connection successful');
}).catch((err) => {
    console.log(err);
})