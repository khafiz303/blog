const mongoose = require('mongoose')

const userSchema =new mongoose.Schema({
    full_name : String,
    email : String,
    password : String,
    githubId : String,
    
})

module.exports = mongoose.model('User' , userSchema)