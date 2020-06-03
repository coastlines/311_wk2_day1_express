
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */

/**** PART ONE ****/

// GET /users
// return the users array
app.get('/users', (req, res) => {
  res.json(users) 
})

// GET /users/1
// return the first user object
app.get('/users/1', (req, res) => {
  res.json(users[0]) 
})

// POST /users
app.post('/users', (req, res) => {
  req = {
    "_id": 6,
    "name": "Garland Briggs",
    "occupation": "Unite States Air Force Major (OF-3)",
    "avatar": "https://i1.wp.com/www.culturedarm.com/wp-content/uploads/2014/09/5qdvA-2.png?resize=1061%2C792"
  }

  users.push(req)
  res.json(users)
})

// PUT users/1

app.put('/users/1', (req, res) => {
  users[0].name = "Gordon Cole"

  res.json(users[0])
})

// DELETE users/1
app.delete('/users/1', (req, res) => {
  users.shift()

  res.json(users)
})

/**** PART TWO ****/

// use bodyParser
app.use(bodyParser.json());


// POST users
app.post('/users', (req, res) => {
  let counter = users.length+1

  let newUser = {
    _id: counter,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  }

  users.push(newUser)

  res.json(users[users.length-1])
})

{
  "_id": 7,
  "name": "test",
  "occupation": "test",
  "avatar": "http://vignette4.wikia.nocookie.net/deadliestfiction/images/d/de/Spike_Spiegel_by_aleztron.jpg/revision/latest?cb=20130920231337"
}

{
	"name": "test",
	"occupation": "test",
	"avatar": "http://vignette4.wikia.nocookie.net/deadliestfiction/images/d/de/Spike_Spiegel_by_aleztron.jpg/revision/latest?cb=20130920231337"
 }

/**** PART THREE ****/

// GET /users/:userId
app.get('/users/:userId', (req, res) => {
  let userId = req.params.userId

  res.json(users[userId])
})

// PUT /users/:userId
app.put('/users/:userId', (req, res) => {
  let userId = req.params.userId
  let selectedUser = users[userId]

  if (req.body.name) {
    selectedUser.name = req.body.name 
  }
  
  if (req.body.occupation) {
    selectedUser.occupation = req.body.occupation
  }

  if (req.body.avatar) {
    selectedUser.avatar = req.body.avatar
  }

   res.json(selectedUser)
})

// {
// 	"name": "warthog",
//    "occupation": "truffle hunter",
// }

// DELETE /users/:userId
app.delete('/users/:userId', (req, res) => {
  let userId = req.params.userId
  let selectedUser = users[userId]

  selectedUser.isActive = false
  console.log(selectedUser)

  res.send(`${selectedUser.name} (userId:${userId}) has been deleted`)
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))
