 let  currentPage = 1
 let lastPage = 1
//infinite scrool//
window.addEventListener("scroll", function() {
  const endOfPage = window.innerHeight + window.scrollY >= document.body.scrollHeight;
  if (endOfPage && currentPage < lastPage) {
   currentPage = currentPage + 1
  //******هلغي استدعاء الدالة علشان الlast page بقت كتيرة اوي  */
    getPosts(false, currentPage)



  
  }
});



//**infinte scrool**//


setupUi()
getPosts()

function getPosts(reload = true, page = 1){
   toggleloader(true)
    axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=6&page=${page}`)
  .then(function (response) {
    toggleloader(false)
    let posts = response.data.data
      lastPage = response.data.meta.last_page
    console.log(posts)

    if (reload) {
      document.getElementById("posts").innerHTML =""
    }
    
     for(post of posts){
      let user = getCurrentUser()// بترجعلي القيمة المتخزنة لليوز في اللوكال ستورج 
      // عرفت المتغير ده وبقوله هيبقي ترو في حالة اليوز موجود وكمان ال id اللي راجع من api هو هو ال id اللي متخزن في اللوكال 
      let isMyPost = user !== null && post.author.id == user.id
      // عرفت متغير وسبته فاضي وهديله قيمة في حالة تحقق الشرط 
      let editBtn =""

      if(isMyPost){
        editBtn = `<!-- ارسلت البوست كبرامتر علشان اخد منه بس  بطريقة معينة لان الhtml مش بتقبل اوبجكت كبرامتر  ال title , body, id , -->
                     <button class="btn btn-secondary" onclick="editPostClicked('${encodeURIComponent(JSON.stringify(post))}')"> Edit</button>`


      }

      let deleteBtn = ""

      if(isMyPost){
        deleteBtn = ` <button class="btn btn-danger" onclick="deletePostClicked('${encodeURIComponent(JSON.stringify(post))}')">Delete</button>`

      }


        document.getElementById("posts").innerHTML += `
        <div class="d-flex justify-content-center mt-5">
            <div class="col-9">
                <div class="card shadow rounded my-3">
                    <div class="card-header">
                    <span onclick="userClicked(${post.author.id})" style="cursor:pointer;"> 
                    <img src="${post.author.profile_image}" class="rounded-circle border border-3"  alt="user">
                     <span>${post.author.username}</span>
                    </span>
                    
                     
                     <div  style="float:right; color:white margin-left:5px">
                      ${editBtn}
                      ${deleteBtn}
                     </div>
                    
                     
                    </div>
                    <div class="card-body" onclick="postClicked(${post.id})" style="cursor:pointer">
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
                        
                      
                    </div>
                </div>

            </div>
        </div>
        `

        const tags = post.tags
        console.log(tags)
        for(tag of tags){
         document.getElementById(tags).innerHTML +=`
          <button class="btn btn-sm rounded-5" style="background-color:grey; color:white">
          ${tag.name}
          </button>
                               
         `
 
       }
     } 
      //const currenrPostTagId = `post-tags-${post.id}`
     
    
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

     

 function userClicked(userId) {
  
  // بغش الكويري برامتر userid من السيرش بتاع الصفحة 
 window.location = `profile.html?userid=${userId}`

}
 









     
  








