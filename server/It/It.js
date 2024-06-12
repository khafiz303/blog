const mongoose = require('mongoose')

const ItSchema = new mongoose.Schema({
    name : String,
    key : Number,
})

module.exports = mongoose.model('It' , ItSchema)