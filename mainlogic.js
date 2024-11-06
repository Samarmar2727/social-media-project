

function setupUi(){
    const token = localStorage.getItem("token")
    const loginInfo = document.getElementById("login-info")
    const logOutInfo = document.getElementById("logout-info")
    const addBtn = document.getElementById("add-btn")
  
  
     if(token == null){ //user is guest (not logged in)
       loginInfo.style.display ="flex"
       logOutInfo.style.display ="none"
        
    
       if(addBtn !== null){
         addBtn.style.display ="none"
       }
  
     
   
  
     } else {
        loginInfo.style.display ="none"
        logOutInfo.style.display ="flex"
        
  
        if(addBtn  !== null){
          addBtn.style.display ="block"
         
        }
  
        // to do again 
        const user = getCurrentUser()
        document.getElementById("user-input").innerHTML = user.username
        document.getElementById("user-img").src = user.profile_image
    }
  }

 
  function loginBtnClicked(){
    toggleloader(true)
    let userName = document.getElementById("username-input").value
    let password = document.getElementById("password-input").value
    
    axios.post('https://tarmeezacademy.com/api/v1/login', {
        username: userName,
        password: password
      })
      .then(function (response) {
        toggleloader(false)
       localStorage.setItem("token", response.data.token)
       localStorage.setItem("user", JSON.stringify(response.data.user))

       // to hide modal using bootstrap show
       const modal = document.getElementById("login-Modal")
       const modalInstance = bootstrap.Modal.getInstance(modal)
       modalInstance.hide()
       successfullyAlert("loggedIn is successfully", "success")
      setupUi()

      })
      .catch(function (error) {
        successfullyAlert(error.response.data.message, "danger");
      })
      .finally(function (){
        toggleloader(false)
      })
}

  // عملنا الدالة دي علشان احول القيمة المتخزنة في اللوكال ستورج الي جيسون واستخدمها 
    // الدالة دي بترجعلي القيمة المتخزنة لليوزر في اللوكال ستورج 
    function getCurrentUser() {
      let user = null
      const storageUser = localStorage.getItem("user")
      
      if(storageUser !== null ){
        user = JSON.parse(storageUser)
    
      }
      return user
        
    }

  function registerBtnClicked(){
    toggleloader(true)
    let name =  document.getElementById("register-name-input").value
    let userName = document.getElementById("register-username-input").value
    let password = document.getElementById("register-password-input").value
    let image = document.getElementById("register-image-input").files[0]

    let formData = new FormData()
    formData.append("username", userName)
    formData.append("password", password)
    formData.append("name", name)
    formData.append("image", image)
   
      
    
   axios.post('https://tarmeezacademy.com/api/v1/register',formData,  {
  }).then(function (response) {
       localStorage.setItem("token", response.data.token)
       localStorage.setItem("user", JSON.stringify(response.data.user))

       // to hide modal using bootstrap show
       const modal = document.getElementById("register-Modal")
       const modalInstance = bootstrap.Modal.getInstance(modal)
       modalInstance.hide()
       successfullyAlert("registered is successfully", "success")
       setupUi()

      })
      .catch(function (error) {
        const message = error.response.data.message
        successfullyAlert(message, "danger")
      })
      .finally(function (){
        toggleloader(false)
      })
}
   
  


 function loggedOut() {

  localStorage.removeItem("token")
  localStorage.removeItem("user")
  successfullyAlert("loggedout is successfully", "danger")
  setupUi()
 

  

}




//posts requests//

function  createNewpostClicked(){
  toggleloader(true)
  let postId = document.getElementById("post-id-input").value
  // لو انا هضيف يبقي زر الكرييت خاص بال اضافة بوست
  let isAdd = postId == null || postId == ""
  
  const title = document.getElementById("post-title-input").value
  const body = document.getElementById("post-body-input").value
  const image = document.getElementById("post-image-input").files[0]

   let apiUrl =""
   const bearerToken = localStorage.getItem("token")

   let formData = new FormData()
     formData.append("title", title)
     formData.append("body", body)
     formData.append("image", image)

     if (isAdd) {
      apiUrl = "https://tarmeezacademy.com/api/v1/posts"
      
    } else {

      formData.append("_method", "put")
      apiUrl = `https://tarmeezacademy.com/api/v1/posts/${postId}`
     

    }

    // الكود ده علشان متكرر في الحالتين حطيته برا else , if علشان يشتغل علي اي حال منهم 

    axios.post(apiUrl,formData,  {
      headers: {
        'Authorization': `Bearer ${bearerToken}`
    },
      
   
  })
  .then(response => {
    console.log(response)
       // to hide modal using bootstrap show
       const modal = document.getElementById("add-post-Modal")
       const modalInstance = bootstrap.Modal.getInstance(modal)
       modalInstance.hide()
       successfullyAlert("edit post is successfully", "success")
       setupUi()
       getPosts()
      
  })
  .catch(function (error) {
    successfullyAlert(error.response.data.message, "danger");
  })
 .finally(function(){
  toggleloader(false)

 })
}
   

  

function editPostClicked(postobj){
  
  // هنا حولناه الي اوبجكت بيفهمه الجافاسكريبت بعد ما في html حولناه الي طريقة تفهما ال 
  let post = JSON.parse(decodeURIComponent(postobj))
  console.log(post)
  alert("yes yes yes")
  document.getElementById("btn-create").innerHTML = "Ubdate"
 document.getElementById("post-id-input").value = post.id
 document.getElementById("title-post-modal").innerHTML = "Edit Post"
 document.getElementById("post-title-input").value = post.title
 document.getElementById("post-body-input").value = post.body
  // طريقة استدعاء المودال عن طريق الجافاسكريبت 
  let editModal = new bootstrap.Modal(document.getElementById("add-post-Modal"), {})
  // خاصية ال توجل بتفتح الملف لو كان مقفول وتقفله لو كان مفتوح 
  editModal.toggle()
}

function addPostClicked(){
  
 document.getElementById("btn-create").innerHTML = "create"
 document.getElementById("post-id-input").value = ""
 document.getElementById("title-post-modal").innerHTML = "Create A new Post"
 document.getElementById("post-title-input").value = ""
 document.getElementById("post-body-input").value = ""
  // طريقة استدعاء المودال عن طريق الجافاسكريبت 
  let editModal = new bootstrap.Modal(document.getElementById("add-post-Modal"), {})
  // خاصية ال توجل بتفتح الملف لو كان مقفول وتقفله لو كان مفتوح 
  editModal.toggle()
}

 function deletePostClicked(postobj){
  let post = JSON.parse(decodeURIComponent(postobj))
  console.log(post)
  alert("yes")
 document.getElementById("delete-title").innerHTML = post.title;
 // جبت الid عن طريق الاوبجكت 
 // delete id input ده input بستخدمه احفظ فيه بس قيمة ال id ويخفيه اصلا ميبقش ظاهر لليوزر
 document.getElementById("delete-id-input").value = post.id

  let deleteModal = new bootstrap.Modal(document.getElementById("modal-delete"), {})
  // خاصية ال توجل بتفتح الملف لو كان مقفول وتقفله لو كان مفتوح 
  deleteModal.toggle()
}
 function confirmDeletePost(){
  // حفظت قيمة ال id في متغير علشان استخدمه في api request
  const id = document.getElementById("delete-id-input").value
  const bearerToken = localStorage.getItem("token")
  
  axios.delete(`https://tarmeezacademy.com/api/v1/posts/${id}`, {
    headers: {
      'Authorization': `Bearer ${bearerToken}`
  },
  })
  .then(function (response) {
    console.log(response)


   // to hide modal using bootstrap show
   const modal = document.getElementById("modal-delete")
   const modalInstance = bootstrap.Modal.getInstance(modal)
   modalInstance.hide()
   successfullyAlert("The Post Has been Deleted  Successfully", "success")
  setupUi()

  })
  .catch(function (error) {
    successfullyAlert(error.response.data.message, "danger");
  });


}
  function toggleloader( show = true){
    if (show){
      document.getElementById("loader").style.visibility = "visible"
    } else {
      document.getElementById("loader").style.visibility = "hidden"
  
    }
  
   }

 function successfullyAlert(customMessage, status){
  const alert= document.getElementById('successfully-alert')
 const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alert.append(wrapper);
}

    appendAlert(customMessage, status)

    setTimeout(() => {
    const alerttoHide = bootstrap.Alert.getOrCreateInstance('#successfully-alert')
    alerttoHide.close()
   
    }, 3000);
    


}







 function getProfileUser(){
  let currentUser = getCurrentUser()
  const userId = currentUser.id
  window.location = `profile.html?userid=${userId}`
  
 }












  // داله ال alert دي جبناها من البوتستراب حتي اغلاقها كمان بس انا ضفت البرامتر بقي علشان مع كل استدعاء احط اللي انا عاوزاه 

function postClicked(id){
  // بقدر استخدم الكويري برامتر في اي كود مش لازم مع ال api 
    window.location = `post details.html?postId=${id}`
  }
    