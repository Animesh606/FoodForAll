const getHomePage = (req, res) => {
    // console.log(req.cookies.access_token);
    if(req._id){
        res.status(200).render('home', {
            login : 'none',
            profile : 'inline-block',
            name : req.firstName
        })
    }
    else{
        res.status(200).render('home', {
            login : 'inline-block',
            profile : 'none'
        });
    }
}
const getContactPage = (req, res) => {
    res.status(200).render('contact');
}
const getLoginPage = (req, res) => {
    res.status(200).render('loginpage');
}

module.exports = {getHomePage, getContactPage, getLoginPage};