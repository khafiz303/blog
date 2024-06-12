const express = require('express')
const router = express.Router()
const {Newblog , editBlog , deleteBlog} = require('./controller')
const {isAuth} = require('../auth/middlewares')
const {upload} = require('./multer')


router.post('/api/new/blog' , isAuth , upload.single('image') ,  Newblog)
router.post('/api/edit/blog' , isAuth ,  upload.single('image') , editBlog)
router.delete('/api/delete/blog/:id', isAuth , deleteBlog )
module.exports = router

































































































































































