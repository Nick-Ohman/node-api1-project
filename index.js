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

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.filter(user => user.id === id);

    if(user.length === 0){res.status(404).json({
        errorMessage: "the user with the specified id does not exist"
    })}else{
        res.status(200).json(user)
    }

}