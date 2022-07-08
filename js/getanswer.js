function printquestion() {
    let userindex = localStorage.getItem("userindex");
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
    let ptsindex = sessionStorage.getItem("ptsindex")

    // for user login info
    let profilename = document.getElementById('profilename');
    let username = document.getElementById('username');
    let profileemail = document.getElementById('profileemail');
    let profilefirstword = document.getElementById('profilefirstword');
    profilename.innerHTML = `${teamdata[userindex].name}`
    username.innerHTML = `@${teamdata[userindex].username}`
    profileemail.innerHTML = `${teamdata[userindex].email}`
    profilefirstword.innerHTML = `${teamdata[userindex].name.charAt(0)}`
    // _____________________________________________________

    let showquestionid = document.getElementById("showquestionid");
    let quesForAnswerhtml = "";

    var question = teamdata[userindex].partteam[ptsindex].question;

    if (question.length > 0) {
        question.forEach((quesForAnswer, quesForAnswerInd) => {
            quesForAnswerhtml += `<div class="col-md-8 my-5">
                                    <div class="form-outline">
                                        <label for="teamnameinput" class="form-label"><b>Q${quesForAnswerInd + 1}: ${quesForAnswer.ques}</b></label>
                                        <input id="answerid" type="text" class="form-control shadow-remove borderradius-remove"
                                        placeholder="Answer">
                                    </div>
                                </div>`
        });
        showquestionid.innerHTML = quesForAnswerhtml
    } else {
        showquestionid.innerHTML = `<p class="my-5 text-center">You have not yet received any question's from Admin. <u><b>${teamdata[userindex].name}</b></u></p>`
    }

}

function submitansbtn() {
    let userindex = localStorage.getItem("userindex");
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
    let ptsindex = sessionStorage.getItem("ptsindex")
    var question = teamdata[userindex].partteam[ptsindex].question;
    var partteamAdminEmail = teamdata[userindex].partteam[ptsindex].adminEmail;
    var partteamKey = teamdata[userindex].partteam[ptsindex].teamkey;
    console.log(partteamKey);

    teamdata.forEach((email, emailind) => {
        if (email.email == partteamAdminEmail) {
            teamdata[emailind].createdteam.forEach((tkey, tkeyind) => {
                var check = tkey.teamkey;
                if (check == partteamKey) {
                    console.log("key match", tkeyind);
                    question.forEach((ele, ind) => {
                        let get = document.getElementById('showquestionid').elements[ind].value;
                        if (get.length === 0) {
                            swal("Please FIll All input", "if you want to skip any question type 'skip'", "info");
                        } else if (get.length > 0) {
                            teamdata[userindex].partteam[ptsindex].question[ind].ans = get;
                            localStorage.setItem("persons", JSON.stringify(teamdata));
                            // document.getElementById('showquestionid').elements[ind].value = "";
                        }
                        anspageLoad(ind);
                    });
                    var questionData = teamdata[userindex].partteam[ptsindex].question;
                    var name = teamdata[userindex].name;
                    var email = teamdata[userindex].email;
                    var username = teamdata[userindex].username;
                    let reportData = {
                        name: name,
                        email: email,
                        username: username,
                        fill: questionData,
                    }
                    teamdata[emailind].createdteam[tkeyind].reports.push(reportData)
                    // console.log(teamdata[emailind].createdteam[tkeyind].reports);
                    localStorage.setItem("persons", JSON.stringify(teamdata));



                    // teamdata[emailind].createdteam[tkeyind].reports.push(reportData)
                    //     console.log(teamdata[emailind].createdteam[tkeyind].reports);
                }
            })
        }
    })
}

function anspageLoad() {
    let userindex = localStorage.getItem("userindex");
    let teamdata = JSON.parse(localStorage.getItem("persons")) || [];
    let ptsindex = sessionStorage.getItem("ptsindex");
    var question = teamdata[userindex].partteam[ptsindex].question;
    var anssubmitbtn = document.getElementById("anssubmitbtn");

    question.forEach((ele, ind) => {
        if (ele.ans.length > 0) {
            var input = document.getElementById('showquestionid').elements[ind];
            anssubmitbtn.disabled = true;
            document.getElementById('showquestionid').elements[ind].value = ele.ans
            input.disabled = true;
        }
    

    });

}