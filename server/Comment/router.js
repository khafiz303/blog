const express = require('express')
const router = express.Router()
const {commentBlog} = require('./controller')


router.post('/api/comment/blog' , commentBlog )

module.exports = router