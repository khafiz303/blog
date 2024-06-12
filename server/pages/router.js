const express = require('express')
const moment = require('moment')
const User = require('../auth/User')
const router = express.Router()
const blog = require('../blog/blog')
const It = require('../It/It')
const Comment =require('../Comment/comment')

router.get('/' ,async (req , res) =>{
    const options = {}
    const it = await It.findOne({key : req.query.categ}) 
    if(it){
        options.category = it._id
        var categString = req.query.categ
    }
    if(categString >= 0){
        res.locals.categString = categString
    }
    if(req.query.search && req.query.search.length >= 0){
        options.$or = [
            {
                title : new RegExp(req.query.search , 'i')
            }
           
        ]
        res.locals.searchString = req.query.search 
    }
    let page = 0
    limit = 3
    totalFilms = await blog.find(options).countDocuments()
    if(req.query.page && req.query.page.length > 0){
        page = req.query.page
    }
    console.log(req.user);
    const Blog = await blog.find(options).limit(limit).skip(page * limit).populate('author').populate('category');
    const category = await It.find()
    const comments = await Comment.find().populate('blog')
    res.render('index' , {blog : Blog , user : req.user ? req.user : {} , category, pages: Math.ceil(totalFilms / limit) , comments, moment})

})

router.get('/profile/:id', async (req, res) => {
    options = {}
    const limit = 3
    var page = 0
    totalBlog= await blog.find({ author : req.params.id}).countDocuments()
    if(req.query.page && req.query.page > 0){
        page = req.query.page
    }
    const comments = await Comment.find().populate('blog')
    const user = await User.findById(req.params.id);
    
    if (user) {
        const blogs = await blog.find({ author: req.params.id }).limit(limit).skip(page * limit).populate('author').populate('category');
        res.render('profile', { user: user, blog: blogs , userId : req.user ? req.user : {} , moment ,
         comments,totalBlog , pages : totalBlog / limit});
    } else {
        res.redirect('/not-found');
    }
  })

module.exports = router;




router.get('/noacc' , (req , res) =>{
    res.render('noacc',  {user : req.user ? req.user : {}})
})

router.get('/new-blog' , async (req , res) =>{
    const allIt =  await It.find()
    res.render('new-blog' , {It : allIt ,  user : req.user ? req.user : {}} )
})


router.get('/edit-blog/:id' , async (req , res) =>{
    const Blog = await blog.findById(req.params.id)
    console.log(Blog);
    const allIt =  await It.find()
    res.render('edit-blog' , {It : allIt , blog : Blog,  user : req.user ? req.user : {}})
})

router.get('/login' , (req , res) =>{

    res.render('login' ,  {user : req.user ? req.user : {}})
})

router.get('/sign' , (req , res) =>{
    let foundUser = ''
    if(req.query.error  &&  req.query.error == 3){
        foundUser = 'Пользователь с таким email существует'
    }
    res.render('sign' , {user : req.user ? req.user : {} , foundUser})
})

router.get('/not-found', (req, res) => {    
    res.render('not-found');
});

router.get('/blog/detail/:id' , async (req , res) =>{
    const Blog = await blog.findOne({_id : req.params.id}).populate('author').populate('category')
    const Comments = await  Comment.find().populate('author')
    const CommentsCount = await Comment.find({blog :req.params.id }).countDocuments()
    const findUser = await blog
    res.render('detail' , { user : req.user ? req.user : {} , blog : Blog , comments  : Comments, CommentsCount } )
    
    
    
})


module.exports = router