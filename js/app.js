// FOr Adding Data on local storage
function createteamdatastore() {
    let userindex = localStorage.getItem("userindex");
    // console.log(userindex);
    var signupdata = JSON.parse(localStorage.getItem("persons")) || [];
    var adminName = signupdata[userindex].name;
    var adminEmail = signupdata[userindex].email;

    let teamnameinput = document.getElementById('teamnameinput').value;
    let teamcatogeryinput = document.getElementById('teamcatogeryinput').value;
    let memberemailinput = document.getElementById('memberemailinput').value;
    let commaseprate = memberemailinput.split(',');
    // console.log(commaseprate);
    var d = new Date();
    var n = d.getTime()
    var questionarr = [];
    var reportarr = []
    let person = {
        adminEmail: adminEmail,
        adminName: adminName,
        teamname: teamnameinput,
        category: teamcatogeryinput,
        members: commaseprate,
        question: questionarr,
        reports: reportarr,
        teamkey: n,
    };

    if ((teamnameinput.length && memberemailinput.length) > 0) {
        if (memberemailinput.indexOf(" ") == -1) {
            if (memberemailinput.charAt(memberemailinput.length - 1) !== ",") {
                if (memberemailinput.indexOf(",,") == -1) {
                    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
                    teamdata[userindex].createdteam.push(person);
                    localStorage.setItem("persons", JSON.stringify(teamdata));
                    swal("Team Created", "Add more member If you want", "success");
                    createteam();
                    document.getElementById("teamnameinput").value = "";
                    document.getElementById("teamcatogeryinput").value = "";
                    document.getElementById("memberemailinput").value = "";
                } else {
                    swal("More Than one Comma (,) is not Allow")
                }
            } else {
                swal("You Enter (,) in the last, Its Not Allow")
            }
        } else {
            swal("Member Filed Cannot contain Any Empty Space")
        }
    } else {
        swal("Please Input first");
    }
    // if(memberemailinput.length == 0){
    //     console.log("adasd");
    // }
};

// adding member 
// function addmember() {
//     let memberemailinput = document.getElementById('memberemailinput').value;
//     console.log(memberemailinput);
//     document.getElementById('memberemailinput').value = "";
// }

// Create Team 
function createteam() {
    let userindex = localStorage.getItem("userindex")
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];

    let profilename = document.getElementById('profilename');
    let username = document.getElementById('username');
    let profileemail = document.getElementById('profileemail');
    let profilefirstword = document.getElementById('profilefirstword');
    profilename.innerHTML = `${teamdata[userindex].name}`
    username.innerHTML = `@${teamdata[userindex].username}`
    profileemail.innerHTML = `${teamdata[userindex].email}`
    profilefirstword.innerHTML = `${teamdata[userindex].username.charAt(0)}`


    let html = '';
    let createElement = document.getElementById('createElement');
    if (teamdata[userindex].createdteam.length == 0) {
        createElement.innerHTML = `<p style="font-size:16px; text-align: center; margin: 20px 0px 20px 0px">
                                    No Team Created. Click on (+) Icon to Create Your Team </p>`
    } else {

        teamdata[userindex].createdteam.forEach((item, index) => {

            //? index jis team k andar email add hua he
            //? personindex jis user me email mila he

            teamdata.forEach((personitem, personindex) => {

                item.members.forEach((mmitem, mmind) => {
                    if (mmitem == personitem.email) {

                        partTeamDataStore(index, personindex);
                        console.log("pass=>", "team ka index[index]:", index, "Email js usr ka mla[personindex]:", personindex);
                    }
                })
            })

            if (item.members.length == 1) {
                var members = item.members[0];
            } else if (item.members.length == 0) {
                var members = "Not added yet"
            }
            else {
                var members = item.members[0] + ", " + item.members[1] + " & " + `<b> ${(item.members.length - 2)} </b>` + " Other"
            }
            let teamname = item.teamname;
            let capitializaTeamname = (teamname.charAt(0).toUpperCase() + teamname.slice(1));

            html += `<fieldset class="myteam fw-normal text-start">
                    <div class="myteamcontent">
                        <p class="teamname">${capitializaTeamname}</p>
                        <hr>
                        <i> <p class="member">Members:</p></i>
                        <div class="d-flex justify-content-between">
                            <ul class="teammember" id="memberlist">
                            ${members} 
                            </ul>
                            <div class="text-center">
                            <i onclick="editteam(${index})" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  style="cursor: pointer;" class="bi bi-pencil-square pe-2"></i>
                            <i onclick="settingteam(${index})" class="bi bi-gear-fill" style="cursor: pointer;"></i>
                            </div>
                        </div>
                        
                        <hr>
                        <p class="teammember"><b>Category:</b> ${item.category}</p>
                    </div>
                    
                </fieldset>`
        });

        createElement.innerHTML = html;
    }
}

// editteam
function editteam(index) {
    let userindex = localStorage.getItem("userindex");

    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
    let createteamid = document.getElementById('createteamid');
    let editteambutton = document.getElementById('editteambutton');

    document.getElementById('teamnameinput').value = teamdata[userindex].createdteam[index].teamname;
    document.getElementById('teamcatogeryinput').value = teamdata[userindex].createdteam[index].category;
    document.getElementById('memberemailinput').value = teamdata[userindex].createdteam[index].members;
    // console.log(teamdata[index].email);
    createteamid.style.display = "none";
    editteambutton.style.display = "block";

    let hiddeninput = document.getElementById('hiddeninput');
    // console.log(index);
    hiddeninput.value = index;
    console.log(teamdata[userindex].createdteam[index].teamkey);
}

function saveeditteam() {
    let userindex = localStorage.getItem("userindex");
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
    let hiddeninput = document.getElementById('hiddeninput').value;

    var existingadminName = teamdata[userindex].createdteam[hiddeninput].adminName;
    var existingadminEmail = teamdata[userindex].createdteam[hiddeninput].adminEmail;
    var existingteamkey = teamdata[userindex].createdteam[hiddeninput].teamkey;

    let teamnameinput = document.getElementById('teamnameinput').value;
    let teamcatogeryinput = document.getElementById('teamcatogeryinput').value;
    let memberemailinput = document.getElementById('memberemailinput').value;
    let commaseprate = memberemailinput.split(',');

    var arr = teamdata[userindex].createdteam[hiddeninput].question;
    var ereportarr = teamdata[userindex].createdteam[hiddeninput].reports;
    let person = {
        adminEmail: existingadminEmail,
        adminName: existingadminName,
        teamname: teamnameinput,
        category: teamcatogeryinput,
        members: commaseprate,
        question: arr,
        reports: ereportarr,
        teamkey: existingteamkey,
    };

    if ((teamnameinput.length && memberemailinput.length) > 0) {
        if (memberemailinput.indexOf(" ") == -1) {
            if (memberemailinput.charAt(memberemailinput.length - 1) !== ",") {
                if (memberemailinput.indexOf(",,") == -1) {
                    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
                    teamdata[userindex].createdteam[hiddeninput] = person;
                    localStorage.setItem("persons", JSON.stringify(teamdata));
                } else {
                    swal("More Than one Comma (,) is not Allow")
                }
            } else {
                swal("You Enter (,) in the last, Its Not Allow")
            }
        } else {
            swal("Member Filed Cannot contain Any Empty Space")
        }
    } else {
        swal("Empty Field Not Allowed")
    }
    createteam();
    partteamshow();
}

// Deleteall
function deleteall() {
    let userindex = localStorage.getItem("userindex");

    var person = []
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
    teamdata[userindex].createdteam = person;
    localStorage.setItem("persons", JSON.stringify(teamdata));
    createteam();
}

function showinputmodalbox() {
    let createteamid = document.getElementById('createteamid');
    let editteambutton = document.getElementById('editteambutton');
    document.getElementById('teamnameinput').value = "";
    document.getElementById('teamcatogeryinput').value = "";
    document.getElementById('memberemailinput').value = "";
    editteambutton.style.display = "none"
    createteamid.style.display = "block"
};

function settingteam(index) {
    let userindex = localStorage.getItem("userindex");
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];

    let teamname = teamdata[userindex].createdteam[index].teamname;
    let category = teamdata[userindex].createdteam[index].category;
    let members = teamdata[userindex].createdteam[index].members;

    // sessionStorage.setItem("teamname", teamname);
    // sessionStorage.setItem("category", category);
    // sessionStorage.setItem("members", JSON.stringify(members));
    sessionStorage.setItem("settingteamindex", index);

    window.location.href = "./teamowner.html"
}

function logout() {
    localStorage.removeItem("userindex");
    window.location.href = "./login.html"
}


function partTeamDataStore(index, personindex) {
    let teamdata = JSON.parse(localStorage.getItem("persons"));
    let userindex = JSON.parse(localStorage.getItem("userindex"));

    let teamkey = teamdata[userindex].createdteam[index].teamkey;
    let flag = false;

    teamdata[personindex].partteam.forEach((partitem, partind) => {
    
        if (partitem.teamkey === teamkey) {
            flag = true;
            console.log("prtTeam m js indexpar keymatch hua", partind);
            console.log("alrEADY");

            let partteamkey = teamdata[userindex].createdteam[index].teamkey;
            let partteamname = teamdata[userindex].createdteam[index].teamname;
            let partteamategory = teamdata[userindex].createdteam[index].category;
            let partteammember = teamdata[userindex].createdteam[index].members;
            let partteamadminEmail = teamdata[userindex].createdteam[index].adminEmail;
            let partteamadminName = teamdata[userindex].createdteam[index].adminName;
            let partteamquestion = teamdata[userindex].createdteam[index].question;
            let person = {
                adminEmail: partteamadminEmail,
                adminName: partteamadminName,
                teamname: partteamname,
                category: partteamategory,
                members: partteammember,
                question: partteamquestion,
                teamkey: partteamkey,
            };

            teamdata[personindex].partteam.splice(partind, 1, person);
            localStorage.setItem("persons", JSON.stringify(teamdata));
            // console.log(teamdata[personindex].partteam);
        }
    })
    if (flag == false) {
        console.log("chala do");

        let partteamkey = teamdata[userindex].createdteam[index].teamkey;
        let partteamname = teamdata[userindex].createdteam[index].teamname;
        let partteamategory = teamdata[userindex].createdteam[index].category;
        let partteammember = teamdata[userindex].createdteam[index].members;
        let partteamadminEmail = teamdata[userindex].createdteam[index].adminEmail;
        let partteamadminName = teamdata[userindex].createdteam[index].adminName;
        let partteamquestion = teamdata[userindex].createdteam[index].question;
        let person = {
            adminEmail: partteamadminEmail,
            adminName: partteamadminName,
            teamname: partteamname,
            category: partteamategory,
            members: partteammember,
            question: partteamquestion,
            teamkey: partteamkey,
        };

        teamdata[personindex].partteam.push(person)
        localStorage.setItem("persons", JSON.stringify(teamdata));
    }
}


function partteamshow() {
    let userindex = localStorage.getItem("userindex");
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
    let partteamhtml = '';
    let partteamElement = document.getElementById('partteamElement');

    if (teamdata[userindex].partteam.length > 0) {

        teamdata[userindex].partteam.forEach((ptsitem, ptsindex) => {

            if (ptsitem.members.length == 1) {
                var members = ptsitem.members[0];
            } else if (ptsitem.members.length == 0) {
                var members = "Not added yet"
            }
            else {
                var members = ptsitem.members[0] + ", " + ptsitem.members[1] + " & " + `<b> ${(ptsitem.members.length - 2)} </b>` + " Other"
            }
            let teamname = ptsitem.teamname;
            let capitializaTeamname = (teamname.charAt(0).toUpperCase() + teamname.slice(1));

            partteamhtml += `<fieldset class="myteam fw-normal text-start partteamshow" onclick="getanswer(${ptsindex})">
                    <div class="myteamcontent" >
                        <p class="teamname">${capitializaTeamname}</p>
                        <hr>
                        <i> <p class="member">Members:</p></i>
                        <div class="d-flex justify-content-between">
                            <ul class="teammember" id="memberlist">
                            ${members}
                            </ul>
                        </div>
                        <hr>
                        <div class="container">
                            <div class="row">
                                <div class="col-md-6">
                                    <p class="teammember"><b>Category:</b> ${ptsitem.category}</p>
                                    </div>
                                <div class="col-md-6">
                                    <p class="teammember"><b>Total Question's:</b> ${ptsitem.question.length}</p>
                                </div>
                                <div class="col-md-6">
                                    <p class="teammember"><b>Admin Name:</b> ${ptsitem.adminName}</p>
                                </div>
                                <div class="col-md-6">
                                    <p class="teammember"><b>Admin Email:</b> ${ptsitem.adminEmail}</p>
                                </div>   
                            </div>
                        </div>
                    </div>
                </fieldset>`
        });

        partteamElement.innerHTML = partteamhtml;
    }
    else {
        partteamElement.innerHTML = `<p class="text-center my-3">You Dont have part of any team</p>`;
    }
}


function getanswer(ptsindex) {

    console.log(ptsindex);
    sessionStorage.setItem("ptsindex", ptsindex)
    window.location.href = "./getanswer.html";
}
