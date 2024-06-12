const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new mongoose.Schema({
    text : String,
    author : {type : Schema.Types.ObjectId , ref : 'User' },
    blog : {type : Schema.Types.ObjectId , ref : 'blog' },


})

module.exports = mongoose.model('Comment' , CommentSchema)