setupUi()

  
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get("postId")
 

  getPost()
  function getPost(){
    const apiUrl =`https://tarmeezacademy.com/api/v1/posts/${id}`
    axios.get(apiUrl,  {
 
}).then(response => {
   const post = response.data.data
    let comments = post.comments
    const author = post.author 
    console.log(author)
    let commentsContent =``
    for(comment of comments){
      console.log('******************')
      console.log(comment)
      commentsContent += `
                             <div>
                                <img src="${comment.author.profile_image}" style=" width: 30px;height: 30px; border-radius: 50%;" alt="">
                                <span>@${comment.author.username}</span>
                              </div>
                              <div>
                                <p>${comment.body}</p>
                              </div>
    `
    
    }

    const content =
    
    `   <div class="col-9">
                  <h1> 
                      <span>
                      @ ${author.username}
                      </span>
                      post
                  </h1> 
                  <div class="card shadow rounded my-3">
                    <div class="card-header">
                     <img src="${author.profile_image}" class="rounded-circle border border-3"  alt="user">
                     <span>@${author.username}</span>
                     
                    </div>
                        <div class="card-body" style="cursor:pointer">
                            <img src="${post.image}"  class="w-100"  alt="">
                            <span class="text-secondary">${post.created_at}</span>
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-body">${post.body}</p>
                            <hr class="text-secondary ">
                        <div>
                         
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                              </svg>
                              <span> ${post.comments_count}
                              <span id="post-tags-${post.id}">
                              </span>
                              </span>
                         </div>
                         <div class ="card-comments p-3" style="background-color:rgba(221, 213, 213, 0.799); border-radius:10px">
                           ${commentsContent}
                            <div class="d-flex justify-content-space" id="comment-input">
                              <input  type="text" id="commnt-value" style="width:100%" placeholder="add your comment">
                              <button id="comment-button" onclick="addCommentValue()">send</button>
                            </div>
                                
                         </div>
                             
                         <div>
                          
                          </div>
                          
                       
                  </div>
            </div> 
                `

    

   

    
    document.getElementById("post").innerHTML = content
   
})

}
  


 function addCommentValue(){
  let commentValue = document.getElementById("commnt-value").value
  console.log(commentValue)
  const apiUrl =`https://tarmeezacademy.com/api/v1/posts/${id}/comments`
   const bearerToken = localStorage.getItem("token")
   const params = {
     "body": commentValue
}
 
  axios.post(apiUrl,params,  {

    headers: {
    'Authorization': `Bearer ${bearerToken}`
}


  
  

}).then(response => {
  getPost() // بقوله بمجرد ما ضفت الكومنت استدعيلي الget post () من غير ما اعمل ريفريش 
  

}).catch(error => {
  console.log(error.response.data.message)
  alert(error.response.data.message)
  
  

})
}

 