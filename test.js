//! For gettting input value 
let signupusername = document.getElementById('signupusername').value;
let signupfullname = document.getElementById('signupfullname').value;
let signupemailid = document.getElementById('signupemailid').value;
let signuppassword = document.getElementById('signuppassword').value;

var createdteamarr = [];
var partteamarr = [];

var person = {
    username: signupusername,
    name: signupfullname,
    email: signupemailid,
    password: signuppassword,
    createdteam: createdteamarr,
    partteam: partteamarr,
};
//! First Line check if array exist in localStorage if not exist create empty arr
// ! second line push object in array 
// !third line set data in local storage
var signupdata = JSON.parse(localStorage.getItem("persons")) || [];
signupdata.push(person);
localStorage.setItem("persons", JSON.stringify(signupdata));