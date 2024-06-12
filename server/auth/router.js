const express = require('express')
const router = express.Router()
const {signUp  , login , signOut, githubLogin} = require('./controller')
const passport = require('passport')


router.post('/api/signup' , signUp)
router.post('/api/login' , passport.authenticate('local' ,{failureRedirect : '/login?error=1'}) , login)
router.get('/api/signout', signOut )
router.get('/auth/github', passport.authenticate('github'), githubLogin);


module.exports = router