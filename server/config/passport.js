const passport = require('passport')
require('dotenv').config();
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const GitHubStrategy = require('passport-github').Strategy;
passport.use(new LocalStrategy(
    {
        usernameField : 'email'
    },
    function(email , password , done){
        User.findOne({email}).then(user => {
            bcrypt.compare(password, user.password, function(err, result) {
                if(err) {return done(err)}
                if(result) {return done(null , user)}
            });
        }).catch(e =>{
            return done (e)
        })
    }
))

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID, 
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github',
   
  },
  async function (accessToken, refreshToken, profile, done)  {
   const user = await User.findOne({ githubId: profile.id });



   const newUser = await new User({
        githubId: profile.id,
        full_name: profile.username , 
         email: profile.emails && profile.emails[0] ? profile.emails[0].value : null, 
    }).save();    
    return done(null, newUser);
  })
);


  
passport.serializeUser(function(user , done){
    done(null , user._id)
})

passport.deserializeUser(function(id , done){
    User.findById(id).then((user , err) =>{
        done(err , user)
    })
})

