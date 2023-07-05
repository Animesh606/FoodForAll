const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        const data = jwt.verify(token, process.env.SECRET_KEY);
        req._id = data._id;
        req.firstName = data.firstName;
        next();
    } catch (err) {
        next();
    }
}
module.exports = auth;