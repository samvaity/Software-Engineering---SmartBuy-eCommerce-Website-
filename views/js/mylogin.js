
//$(document).ready(function(){
/*check password*/
function checkPassword()
{   
    var password1 = document.getElementById('pass1');
    var password2 = document.getElementById('pass2');
    var message = document.getElementById('confirmMessage');
    if(password1.value == password2.value){
        password2.style.backgroundColor = "#66cc66";
        message.style.color = "#66cc66";
        message.innerHTML = "Passwords Match"
    }else{
        password2.style.backgroundColor = "#ff6666";
        message.style.color = "#ff6666";
        message.innerHTML = "Passwords Do Not Match!"
    }
} 


// validate email
function email_validate(email)
{
    var regexEmail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
    var message = document.getElementById('confirmEmailMessage');
    if(regexEmail.test(email) == false)
        {
            message.style.color = "#ff6666";
            message.innerHTML = "Please enter a valid email address"
            //document.getElementById("status").innerHTML    = "<span class='warning'>Email address is not valid yet.</span>";
        }
    else
        {
            message.style.color = "#66cc66";
            message.innerHTML = "Thanks, you have entered a valid Email address!"
            //document.getElementById("status").innerHTML	= "<span class='valid'>Thanks, you have entered a valid Email address!</span>";	
        }
}
//});