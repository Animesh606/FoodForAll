const getRegistrationPage = (req, res) => {
    res.status(200).render('regisNGO');
}
const getLoginPage = (req, res) => {
    res.status(200).render('loginpage');
}
const createDetails = (req, res) => {
    res.send('inserted details of organisation');
}
const getUser = (req, res) => {
    res.send('get organisation');
}

module.exports = {getRegistrationPage, getLoginPage, createDetails, getUser};