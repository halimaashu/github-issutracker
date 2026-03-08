document.getElementById("login-btn").addEventListener("click",()=>{
    const userName=document.getElementById("userName").value;
    if(userName!=="admin"){
        alert("Invalid User name")
        return;

    }
    const password=document.getElementById("password").value;
      if(password!=="admin123"){
        alert("Invalid password")
        return;

    }
    alert(`hello ${userName} Login success`);
    document.location.assign("./home.html")
})