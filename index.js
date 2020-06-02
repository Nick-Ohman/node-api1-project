// dependencies
const express = require('express');
const shortid = require('shortid');

// create server
const server = express();
const port = 3001;

//middleware-- express read json
server.use(express.json())

//server runs
server.listen(port, () => console.log(`\n == API running on port ${port} == \n`));

// setting users

let users = [
    {
        id: shortid.generate(),
        name: "Nick",
        bio: "FSW"
    },
    {
        id: shortid.generate(),
        name: "Larry",
        bio: "FSW"
    }
]


// posts for api/users
server.post(`/api/users`, (req, res) => {
    const newUser = req.body
         if(!newUser){
              return res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
         } else if (newUser.name && newUser.bio){
              users.push(newUser)
              return res.status(201).json(users)
         } else {
              return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
         }
})

// get
server.get("/api/users", (req, res) => {
   if (users){
       res.status(200).json(users)
   } else {
       res.status(500).json({
        errorMessage: "The users information could not be retrieved"
       })
   }
})

//handle GET requests for /api/users/:id
server.get(`/api/users/:id`, (req, res) => {
    const urlId = req.params.id
    let singleUser = users.filter(user =>  user.id === urlId)

    if(!users){
         return res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    } else if(!singleUser || singleUser.length === 0){
         return res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
         return res.status(200).json(singleUser)
    }
})

//handle delete request to /api/users/:id
server.delete(`/api/users/:id`, (req, res) => {
    const urlId = req.params.id
    let filteredUsersArray = users.filter(user =>  user.id !== Number(urlId))
    if(!users){
         return res.status(500).json({ errorMessage: "The user could not be removed." })
    }else if(!filteredUsersArray){
         return res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
         return res.status(200).json(filteredUsersArray)
    }
})


//handle put request to /api/users/:id
server.put(`/api/users/:id`, (req, res) => {
    const urlId = req.params.id
    let singleUser = users.filter(user =>  user.id === Number(urlId))
    const editedUser = req.body

    if(!users){
         return res.status(500).json({ errorMessage: "The user information could not be modified." })
    } else if (!singleUser){
         return res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (!editedUser.name || !editedUser.bio){
         return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
         return res.status(200).json(editedUser)
    }
})