var express = require('express');
var router = express.Router();
const passport = require('passport')
const { isLogged, isNotLogged } = require('../lib/auth')

/* GET users listing. */
router.get('/login', isNotLogged, (req, res) => res.render('auth/login'));
router.get('/register',isNotLogged, (req, res) => res.render('auth/register'));
router.get('/profile', isLogged, (req, res) => res.render('profile', {'user': req.user}));

router.post('/register',isNotLogged, passport.authenticate('local.register', {
  successRedirect: '/auth/profile',
  failureRedirect: '/auth/register', 
  failureFlash: true
}))

router.post('/login', isNotLogged, passport.authenticate('local.login', {
  successRedirect: '/auth/profile',
  failureRedirect: '/auth/login', 
  failureFlash: true
}))

router.get('/logout', isLogged, (req, res) => {
  req.logOut((error) => {
    if (error) return next(err)
  })
  res.redirect('/auth/login')
})

module.exports = router;
