const Blog = require('./blog')
const fs = require('fs')
const path = require('path')

const Newblog = async(req , res) =>{
    if(
        req.body.title.length < 2 &&
        req.body.subtitle.length < 2 &&
        req.body.anotherTitle.length < 2 &&
        req.body.category.length < 3 &&
        req.body.description.length < 5 &&
        req.body.anotherDescription.length < 5 &&
        !req.file.filename

    ){
        res.redirect('/new-blog?error=1')
        return
    }else{
         await new Blog({
            title : req.body.title,
            subtitle : req.body.subtitle,
            anotherTitle : req.body.anotherTitle,
            category : req.body.category,
            image: `/images/blogs/${req.file.filename}`,
            description : req.body.description,
            anotherDescription : req.body.anotherDescription,
            author : req.user._id,
            
        }).save()
        res.redirect(`/profile/${req.user._id}`)
    }


}   

const editBlog =async (req , res) =>{
    if(
        req.body.title.length > 2 &&
        req.body.subtitle.length > 2 &&
        req.body.anotherTitle.length > 2 &&
        req.body.category.length > 5 &&
        req.body.description.length > 10 &&
        req.body.anotherDescription.length > 10 &&
        req.file
        ){
            const blogs = await  Blog.findById(req.body.id)
            
            fs.unlinkSync(path.join(__dirname + '../../../public' + blogs.image))
            blogs.title = req.body.title
            blogs.subtitle = req.body.subtitle
            blogs.anotherTitle = req.body.anotherTitle
            blogs.description = req.body.description
            blogs.category = req.body.category
            blogs.anotherDescription = req.body.anotherDescription
            blogs.image = `/images/blogs/${req.file.filename}`
            blogs.save()

            res.redirect('/profile/' + req.user._id)
        }else{
            res.redirect(`/edit-blog/${req.body.id}?error=1`)
        }
}

const deleteBlog = async (req , res) =>{
    if(req.params.id){
        const blog = await Blog.deleteOne({ _id : req.params.id})
        res.send('Блог успешно удален')
    }
    
}

module.exports = {Newblog , editBlog , deleteBlog}