var UserList;
if (localStorage.getItem("UserList") == null)
    UserList = [];
else {
    UserList = JSON.parse(localStorage.getItem("UserList"));

}
function loadName() {
    if (localStorage.getItem("Username") != null) {
        // alert(localStorage.getItem("Username"));
        document.getElementById("welcom").innerHTML = "Welcome  " + localStorage.getItem("Username");
    }
}
function Login() {
    hide_Error();
    var email = document.getElementById("Email").value;
    var pass = document.getElementById("Password").value;
    if (checkMail(email) && checkPass(pass)) {
        // var result = UserList.find(User => User.UserEmail == email & User.UserPassword == pass)
        for (var i = 0; i < UserList.length; i++) {
            if (UserList[i].UserEmail == email && UserList[i].UserPassword == pass) {
                result = UserList[i];
                break;
            }
        }
        if (result != null) {
            console.log(result)
            localStorage.setItem('Username', result.UserName);
            window.location.href = "Home.html";

            // var element = document.getElementById("welcom").value;
            // element.innerHTML =  UserList[i].UserName;
            // document.getElementById("welcom").innerHTML =  result.UserName;
            // var welcome =  document.getElementById("welcom");
            // console.log(welcome)
        }
        else
            show_Error("Not Found")

    }
    else
        show_Error("All inputs is required");
}
function SignUp() {
    hide_Error();

    var UserName = document.getElementById("UserName").value;
    var UserEmail = document.getElementById("UserEmail").value;
    var UserPassword = document.getElementById("UserPassword").value;
    if (checkName(UserName) && checkMail(UserEmail) && checkPass(UserPassword)) {
        if (!isNameExist(UserEmail)) {
            var User = {
                UserName: UserName,
                UserEmail: UserEmail,
                UserPassword: UserPassword
            };
            UserList.push(User);
            localStorage.setItem("UserList", JSON.stringify(UserList));
            Reset();
            hide_Error();
            show_Success();
        }
        else
            show_Error("This Email is already Exist")
    }
    else {
        show_Error("All inputs is required");
    }
}
function show_Error(error_msg) {
    var element = document.getElementById("Error");
    element.innerHTML = error_msg;
    element.classList.remove("d-none");
    element.classList.add("d-block");
}
function show_Success() {
    var element = document.getElementById("Success");
    element.classList.remove("d-none");
    element.classList.add("d-block");
}
function hide_Error() {
    var element = document.getElementById("Error");
    element.classList.remove("d-block");
    element.classList.add("d-none");
}
function isNameExist(UserEmail) {
    if (UserList != null) {
        var count = 0;
        for (var i = 0; i < UserList.length; i++) {
            if (UserList[i].UserEmail == UserEmail) {
                count++;
                break;
            }
        }
        if (count > 0)
            return true;
        else
            return false;
    }
}

function checkName(UserName) {
    if (UserName != null && UserName != "")
        return true;
    else
        return false;
}


function checkMail(UserEmai) {
    if (UserEmai != null && UserEmai != "")
        return true;
    else
        return false;
}


function checkPass(UserPassword) {
    if (UserPassword != null && UserPassword != "")
        return true;
    else
        return false;
}

function Reset() {
    document.getElementById("UserName").value = "";
    document.getElementById("UserEmail").value = "";
    document.getElementById("UserPassword").value = "";
}
function logout() {
    localStorage.removeItem('Username')
}