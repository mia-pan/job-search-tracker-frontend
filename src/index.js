let currentUser = 1

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM CONTENT LOADED")

    //sets an event listener on Add a new job opportunity button and displays the form to add a new job
    let addJobButton = document.getElementById("new-job-btn")
    addJobButton.addEventListener("click", function(){
        let newJobFormContainer = document.querySelector(".container")
        if(newJobFormContainer.style.display === "block") {
            newJobFormContainer.style.display = "none"
        } else {
            newJobFormContainer.style.display = "block"
        }
        console.log("You pressed the add a new job opportunity button!")
    })

    //handles new job form
    let newJobForm = document.querySelector(".add-job-form")
    newJobForm.addEventListener("submit", function(e){
        e.preventDefault()
        console.log(e.target.title.value) //Job Title
        console.log(e.target.description.value) //Job Description
        console.log(e.target.status.value) //Job Status
        console.log(e.target.rating.value) //Job Value
        console.log(e.target["application-date"].value) //Job Application Date
        console.log(e.target.source.value) //Job Source
        buildJobObj(e)
        console.log("New Job submitted!")
    })
    getUsers()
})

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
    })
}

const getUsers = () => {
    fetch("http://localhost:3000/users/")
    .then(res => res.json())
    .then(console.log)
}

const getJobs = () => {
    fetch("http://localhost:3000/jobs/")
    .then(res => res.json())
    .then(console.log)
}

// const createJob = (jobObj) => {
//     fetch("http://localhost:3000/jobs/", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//           },
//         body: JSON.stringify({
//             title: jobObj.title,
//             description: jobObj.description,
//             status: jobObj.status,
//             rating: jobObj.rating,
//             application_date: jobObj.application_date,
//             source: jobObj.source,
//             user_id: currentUser
//         })
//     })
//     .then(res => res.json())
//     .then(console.log)
// }
