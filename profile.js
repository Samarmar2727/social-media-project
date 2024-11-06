

setupUi()
// دالة يتم من خلالها استخراج الqueryparamater اللي هو عندي الuserid 
//  صفحة الهوم اما اضغط علي  userClicked()واللي انا محدداه في 
function getCurrentUserId(){
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get("userid")
    return id

}

getUserInfo()
function getUserInfo(){
    const id = getCurrentUserId()
    axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`)
    .then(function (response) {
        document.getElementById("username-span").innerHTML = `${response.data.data.name}'s`
        document.getElementById("current-user-image").src = response.data.data.profile_image
        document.getElementById("user-info-name").innerHTML = response.data.data.name
        document.getElementById("user-info-email").innerHTML = response.data.data.email
        document.getElementById("user-info-username").innerHTML = response.data.data.username
        document.getElementById("user-info-posts").innerHTML = response.data.data.posts_count
        document.getElementById("user-info-comments").innerHTML = response.data.data.comments_count


})
}

   
getUserPosts()
function getUserPosts(){
const id = getCurrentUserId()
const apiUrl =`https://tarmeezacademy.com/api/v1/users/${id}/posts`
axios.get(apiUrl,  {

}).then(response => {

let posts = response.data.data
document.getElementById("post").innerHTML = ""
for(post of posts){

  let user = getCurrentUser()// بترجعلي القيمة المتخزنة لليوز في اللوكال ستورج 
  // عرفت المتغير ده وبقوله هيبقي ترو في حالة اليوز موجود وكمان ال id اللي راجع من api هو هو ال id اللي متخزن في اللوكال 
  let isMyPost = user !== null && post.author.id == user.id
  // عرفت متغير وسبته فاضي وهديله قيمة في حالة تحقق الشرط 
  let editBtn =""
  let deleteBtn = ""

  if(isMyPost){
    editBtn = `<!-- ارسلت البوست كبرامتر علشان اخد منه بس  بطريقة معينة لان الhtml مش بتقبل اوبجكت كبرامتر  ال title , body, id , -->
                 <button class="btn btn-secondary" onclick="editPostClicked('${encodeURIComponent(JSON.stringify(post))}')"> Edit</button>`
    deleteBtn = ` <button class="btn btn-danger" onclick="deletePostClicked('${encodeURIComponent(JSON.stringify(post))}')">Delete</button>` 
  }

        let author = post.author
        

        let content = `
            <div class="d-flex justify-content-center mt-5">
                        <div class="col-9">
                                <h1> 
                                    <span id="username-span">
                                    ${author.name}'s
                                    </span>
                                post
                                </h1>
                        <!--post-->
                            <div class="card shadow rounded my-3">
                                    <div class="card-header">
                                        <img src=" ${author.profile_image}" class="rounded-circle border border-3"  alt="user">
                                        <span> ${author.username}</span>
                                        <div  style="float:right; color:white margin-left:5px">
                                            ${editBtn}
                                            ${deleteBtn}
                                        </div>
                                    </div>
                                    <div class="card-body">
                                            <img src="${post.image}"  class="w-100"  alt="">
                                            <span class="text-secondary">${post.created_at}</span>
                                            <h5 class="card-title"> ${post.title} </h5>
                                            <p class="card-body"> ${post.body}.</p>
                                            <hr class="text-secondary ">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                        </svg>
                                        <span> ${post.comments_count}</span>
                                </div>
                            
                            </div>
                                
                        
                            
                        
                            </div>
            
                        </div>
                </div>
                `

                document.getElementById("post").innerHTML += content
}



}).catch(error => {
console.log("Error fetching posts:", error);
});


}
