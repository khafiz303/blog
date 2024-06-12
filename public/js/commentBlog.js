function commentBlog(e){
    e.preventDefault()
    const blogId = document.getElementById('blogId').value
    const authorId = document.getElementById('authorId').value
    const textarea = document.querySelector('#textarea').value
    
    
    axios.post('/api/comment/blog' , { blogId ,  authorId ,textarea }).then(response =>{
        if(response.data == 'nice'){
            location.reload()
        }
    })
}