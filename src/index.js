let currentUser = 1

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM CONTENT LOADED")
    getUsers()
})

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
