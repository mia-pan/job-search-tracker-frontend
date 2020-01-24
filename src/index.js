let currentUser = null

let logInStatus = false

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM CONTENT LOADED")
    logIn()
    logOut()
    //sets an event listener on Add a new job opportunity button and displays the form to add a new job
    let addJobButton = document.querySelector(".button-add")
    addJobButton.addEventListener("click", function(){
        let newJobFormContainer = document.querySelector(".container")
        if(newJobFormContainer.style.display === "block") {
            newJobFormContainer.style.display = "none"
        } else {
            newJobFormContainer.style.display = "block"
        }
        // console.log("You pressed the add a new job opportunity button!")

    })
    window.onclick = e => {
        clickLoginModal(e)
    }
    //handles new job form
    let newJobForm = document.querySelector(".add-job-form")
    newJobForm.addEventListener("submit", function(e){
        e.preventDefault()
        buildJobObj(e)
        console.log("New Job submitted!")
        newJobForm.reset()
    })
    // getUsersJobs(currentUser)
    window.onclick = (e) => {
        clickWindow(e)
    }

    
    // //my Hide and Seek with log in Button 
    // const logOutButton = document.getElementById("logout-button")
    // const myProfileButton = document.getElementById("profile-button")
    // // const loginButton = document.getElementById("login-button")
    // if(logInStatus){
    //     logOutButton.style.display = "block"
    //     myProfileButton.style.display = "block"
    // }else {
    //     logOutButton.style.display = "none"
    //     myProfileButton.style.display = "none"
    // }
    // if(currentUser) {
    //     logOutButton.style.display = "block"
    //     myProfileButton.style.display = "block"
    // }else {
    //     logOutButton.style.display = "none"
    //     myProfileButton.style.display = "none"
    // }
    // let loginForm = document.getElementById("login-name")
    // loginForm.addEventListener("click", () => {
    //     logInStatus =! logInStatus
        // if(logInStatus){
        //     logOutButton.style.display = "block"
        // }else {
        //     myProfileButton.style.display = "none"
        // }

    // })

})

const clickWindow = (e) => {
    let modal = document.getElementById("myModal")
    if(e.target == modal) {
        modal.style.display = "none"
    }
}

const clickLoginModal  = (e) => {
    let modal = document.getElementById("my-log-in-modal")
    if(e.target == modal) {
        modal.style.display = "none"
    }
}


const makeJobCard = (jobObj) => {

    let table = document.getElementById("jobs")
    let tr = document.createElement("tr")
    tr.className = "generated-job-row"


    let td1 = document.createElement("td")
    td1.innerText = jobObj.title

    let td2 = document.createElement("td")
    td2.innerText = jobObj.description


    let td3 = document.createElement("td")
    td3.innerText = jobObj.status


    let td4 = document.createElement("td")
    td4.innerText = `${jobObj.rating}` + "/5"

    let td5 = document.createElement("td")
    td5.innerText = jobObj["application_date"]

    let td6 = document.createElement("td")
    td6.innerText = jobObj.source

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)


    tr.addEventListener("click", function() {
        // console.log(jobObj.id)
        modalJob(jobObj)
        let deletebtn = document.getElementById("delete-btn")
        deletebtn.addEventListener("click", function() {
            deleteJob(jobObj.id)

            clearTable()
            getUsersJobs(currentUser)
        })
        

        let modal = document.getElementById("myModal");
        modal.style.display = "block";
        // modal.modal();

        let span = document.getElementsByClassName("close")[0]
        span.onclick = function() {
            modal.style.display = "none";
        }

        let editForm = document.querySelector("#edit-job-form")
        editForm.addEventListener("submit", function(e) {
            e.preventDefault()
            submitEdit(e, jobObj)
            

        })

        })

    table.appendChild(tr)
    return table
}

const submitEdit = (e, jobObj) => {
    fetch(`http://localhost:3000/jobs/${jobObj.id}`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            description: e.target["edit-description"].value,
            status: e.target["edit-status"].value,
            rating: e.target["edit-rating"].value
        })
    }).then(res => res.json())
    .then(generateTable(jobObj.user_id))
}

const generateTable = (userId) => {
    clearTable()
    currentUser = userId
    console.log(currentUser)
    getUsersJobs(currentUser)
    // currentUser
}

const clearTable = () => {
    document.querySelectorAll(".generated-job-row").forEach(e => e.parentNode.removeChild(e));
}

const modalJob = job => {
    let jobTitle = document.getElementById('job-title')
    jobTitle.innerText = job.title

    let jobDesc = document.getElementById('job-desc')
    jobDesc.innerText = job.description

    let jobStat = document.getElementById('job-stat')
    jobStat.innerText = job.status

    let jobRat = document.getElementById('job-rating')
    jobRat.innerText = `Rating: ${job.rating}`

    let jobAppd = document.getElementById('job-appd')
    jobAppd.innerText = job["application_date"]

    let jobSrc = document.getElementById('j-source')
    jobSrc.innerText = job.source

}
//this function builds the job obj and will pass it to the backend and add it to the page
const buildJobObj = (e) => {
    let newJob = {
        title: e.target.title.value,
        description: e.target.description.value,
        status: e.target.status.value,
        rating: e.target.rating.value,
        "application-date": e.target["application-date"].value,
        source: e.target.source.value,
        user_id: currentUser
    }
    postJob(newJob)
}

const postJob = (newJobObj) => {
    fetch("http://localhost:3000/jobs/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: currentUser,
            title: newJobObj.title,
            description: newJobObj.description,
            status: newJobObj.status,
            rating: newJobObj.rating,
            application_date: newJobObj["application-date"],
            source: newJobObj.source
        })
    }).then(res => res.json())
    .then(data => makeJobCard(data))
}

const getUsersJobs = (userId) => {
    fetch(`http://localhost:3000/users/${userId}`)
    .then(res => res.json())
    .then(data => getEachJob(data))
}

const getJobs = () => {
    fetch("http://localhost:3000/jobs/")
    .then(res => res.json())
    .then(console.log)
}

const getEachJob = (userObj) => {

    let jobArray = userObj.jobs 
    // console.log(jobArray)
    jobArray.forEach(job => {
        makeJobCard(job)
    });
}

//post for creating a new user - untested until we have create user form
const createUser = (userObj) => {
    fetch("http://localhost:3000/users/", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userObj
        })
    }).then(res => res.json())
    .then(console.log)
}
// fetch for login ---------------- and login functions
const getAllUsers = (name) => {
    fetch("http://localhost:3000/users/")
    .then(res => res.json())
    .then(data => allUsers(data, name))
}

const allUsers = (userArray, name) => {
    userArray.forEach(user => {
        if(matchUser(user, name)) {
            setCurrentUser(user)
            // getUsersJobs(user.id)
        }
    })
}

const matchUser = (userObj, name) => {
    if(userObj.name == name) {
        return true
    } else {
        return false
    }
}


const setCurrentUser = (userObj) => {
    currentUser = userObj.id
    // let jobRow = document.querySelector(".generated-job-row")
    document.querySelectorAll(".generated-job-row").forEach(e => e.parentNode.removeChild(e));
    // while(jobRow) {
    //     let parentRow = jobRow.parentNode
    //     parentRow.removeChild(jobRow)
    // }
    getUsersJobs(currentUser)
}
//---- end of login functions -------------------------


const deleteJob = (jobId) => {
    fetch(`http://localhost:3000/jobs/${jobId}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    // .then(console.log)
}
//----  recent added login function (mia) -------------------------

const logIn = () => {
    let userModal = document.getElementById("my-log-in-modal");
    let loginButton = document.getElementById("login-button")
    loginButton.addEventListener("click", () => {
        // console.log(e.target["enter-name"].value)
        // getAllUsers(e.target["enter-name"].value)
        // modalName()
        
        userModal.style.display = "block";

        let span = document.getElementsByClassName("closeLogin")[0];
        span.onclick = () => {
            userModal.style.display = "none";
        }
        
    })
    let submitForm = document.getElementById("login-name")
     submitForm.addEventListener("submit", (e) => {
        e.preventDefault()
        console.log(e.target["enter-name"].value)
        getAllUsers(e.target["enter-name"].value)
        userModal.style.display = "none"

    })
}

const modalName = () => {
    let name = document.getElementById('log-in')
    name.innerText = "Welcome to Job Search Tracker"
}

//----  recent added log Out function (mia) -------------------------

const logOut = () => {
    let logOutModal = document.getElementById("my-log-out-modal");
    let logOutButton = document.getElementById("logout-button")
    logOutButton.addEventListener("click", () => {
        // console.log(e.target["enter-name"].value)
        // getAllUsers(e.target["enter-name"].value)
        // modalName()
        
        logOutModal.style.display = "block";

        let span = document.getElementsByClassName("closeLogout")[0];
        span.onclick = () => {
            logOutModal.style.display = "none";
        }
        
    })

    
}

//----  recent added log Out function (mia) -------------------------