const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const pool = require('../database')
const {encryptPassword, comparePasswords} = require('./helpers')

//LOGIN

passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true}, async (req, email, password, done) => {
        const [row] = await pool.query('SELECT * FROM Users WHERE email = ?', [email])
        if (row.length > 0) 
        {
            const user = row[0]
            const goodPass = await comparePasswords(password, user.password)

            if (goodPass) done(null, user, req.flash('Succes!'))
            else done(null, false, req.flash('Incorrect password'))
        }
        else
        {
            return done(null, false, req.flash('No user found'))
        }
    }));

//REGISTER

passport.use('local.register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true}, async (req, email, password, done) => {

        const { username } = req.body
    
        const newPassword = await encryptPassword(password)
    
        const newUser = {
            username,
            email,
            password: newPassword
        }
    
        const [data] = await pool.query('INSERT INTO Users SET ?', [newUser])
    
        newUser.id = data.insertId
    
        return done(null, newUser)
    }));

//PASSPORT CONFIG

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const [user] = await pool.query('SELECT * FROM Users WHERE id = ?',[id])
    done(null, user[0])
})

//EXPORT

module.exports = passport