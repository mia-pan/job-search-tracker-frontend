let currentUser = 1

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM CONTENT LOADED")

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
    getUsers(currentUser)
})

const makeJobCard = (jobObj) => {
    // let jobDiv = document.querySelector("#job-collection")
    // let div = document.createElement("div")
    // div.className = "card"

    // let h2 = document.createElement("h2")
    // h2.innerText = jobObj.title
    // h2.id = "card-description"

    // let pDesc = document.createElement("p")
    // pDesc.innerText = jobObj.description
    // pDesc.id = "card-description"

    // let pStatus = document.createElement("p")
    // pStatus.innerText = jobObj.status
    // pStatus.id = "card-status"

    // let pRating = document.createElement("p")
    // pRating.innerText = `${jobObj.rating}` + "/5"
    // pRating.id = "card-rating"

    // let pDate = document.createElement("p")
    // pDate.innerText = jobObj["application_date"]
    // pDate.id = "card-date"

    // let pSource = document.createElement("p")
    // pSource.innerText = jobObj.source
    // pSource.id = "card-source"
//--------------------TEST AREA BELOW--------------------------
let table = document.getElementById("jobs")
let tr = document.createElement("tr")


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
    console.log(`${jobObj.id}`)
})

table.appendChild(tr)



//--------------------TEST AREA ABOVE--------------------------
    // div.appendChild(h2)
    // div.appendChild(pDesc)
    // div.appendChild(pStatus)
    // div.appendChild(pRating)
    // div.appendChild(pDate)
    // div.appendChild(pSource)

    // jobDiv.appendChild(div)
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

const getUsers = (userId) => {
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
