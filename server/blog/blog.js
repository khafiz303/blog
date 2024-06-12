const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new mongoose.Schema({
    title : String,
    subtitle : String,
    anotherTitle : String,
    category : {type : Schema.Types.ObjectId , ref : 'It'},
    image : String,
    description : String,
    anotherDescription : String,
    author : {type : Schema.Types.ObjectId , ref : 'User'},
    date: {
        type: Date,
        default: () => new Date().setHours(0, 0, 0, 0) 
    }
  

})

module.exports = mongoose.model('blog' , blogSchema)