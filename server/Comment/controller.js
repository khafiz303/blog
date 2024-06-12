const Comment = require('./comment')

const commentBlog = async  (req , res) =>{
    if(req.body.blogId && req.body.authorId  &&  req.body.textarea.length > 0){
      
        await new Comment ({
            blog : req.body.blogId,
            author:  req.body.authorId ,
            text : req.body.textarea,
        }).save()
    } res.status(200).send('nice')
}

module.exports ={
    commentBlog
}