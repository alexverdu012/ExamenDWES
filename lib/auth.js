const isLogged = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    else return res.redirect('/auth/login')
}
const isNotLogged = (req, res, next) => {
    console.log(req.isAuthenticated())

    if (!req.isLogged) return next()
    else return res.redirect('/auth/profile')   
}
    
module.exports = {
    isLogged,
    isNotLogged
}