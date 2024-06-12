function deleteBlog(id){
    axios.delete(`/api/delete/blog/${id}`).then(data =>{
        alert(data.data)
        location.reload()
    })
}