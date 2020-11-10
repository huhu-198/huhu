let registersubmit = document.querySelector(".registersubmit");
let loadsubmit = document.querySelector(".loadsubmit");
let registername = document.querySelector("#registername");
let registeremail = document.querySelector("#registeremail");
let registerpassword = document.querySelector("#registerpassword");
let loadname = document.querySelector("#loadname");
let loademail = document.querySelector("#loademail");
let loadpassword = document.querySelector("#loadpassword");
let clearMusic = document.querySelector(".clearMusic")
let keywords = window.localStorage;

// submit register data
function registerSubmit(){
  let rname = registername.value;
  let remail = registeremail.value;
  let rpassword = registerpassword.value;
  if(!preventRepeat(rname,remail)){
    alert("the name or password has been used,please use a new one");
  }else if(rname!="" && remail!="" && rpassword!=""){
    keywords.setItem(rname,remail);
    keywords.setItem(remail,rpassword);
    alert("Registration successful!");
    window.location.href="load.html";
  }else{
    alert("Can't input empty!");
  }
}
//prevent name or email Repeat
function preventRepeat(rname,remail){
  if(keywords.getItem(rname) == null && keywords.getItem(remail) == null)
    return true;
  return false;
}

// submit load data
function loadSubmit(){
  let lname = loadname.value;
  let lemail = loademail.value;
  let lpassword = loadpassword.value;
  getlocalStorage(lname,lemail,lpassword);
}
// get data and search
function getlocalStorage(lname,lemail,lpassword) {
    let email=keywords.getItem(lname);
    let password=keywords.getItem(lemail);
    if(password == lpassword && email == lemail){
      alert("welcome!");
      window.location.href = "main.html";
      window.localStorage.setItem("now",lname);
      if(user.innerHTML == lname) console.log(1);
    }else if(email == null){
      alert("We can't find the user, please goto register");
    }else{
      alert("Your email or password is wrong, please try again");
    }
}


// Clear all data
function Clear(){
  keywords.clear();
  clearMusic.play();
}


