const getHomePage = (req, res) => {
    res.status(200).render('home');
}
const getContactPage = (req, res) => {
    res.status(200).render('contact');
}
const getLoginPage = (req, res) => {
    res.status(200).render('loginpage');
}

module.exports = {getHomePage, getContactPage, getLoginPage};