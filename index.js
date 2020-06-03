
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

/* BEGIN - create routes here */

/**** PART ONE ****/

// // GET /users
// // return the users array
// app.get('/users', (req, res) => {
//   res.json(users) 
// })

// // GET /users/1
// // return the first user object
// app.get('/users/1', (req, res) => {
//   res.json(users[0]) 
// })

// // POST /users
// // create new user object
// // add new user to the users array
// // return the users array
// app.post('/users', (req, res) => {
//   req = {
//     "_id": 6,
//     "name": "Garland Briggs",
//     "occupation": "Unite States Air Force Major (OF-3)",
//     "avatar": "https://i1.wp.com/www.culturedarm.com/wp-content/uploads/2014/09/5qdvA-2.png?resize=1061%2C792"
//   }

//   users.push(req)
//   res.json(users)
// })

// // PUT users/1
// // set a new put path users/1
// // alter the first user record
// // return altered first user record
// app.put('/users/1', (req, res) => {
//   users[0].name = "Gordon Cole"

//   res.json(users[0])
// })

// // DELETE users/1
// // set a new delete path users/1
// // remove first users from the users array
// // return a confirmation message to the user
// app.delete('/users/1', (req, res) => {
//   users.shift()

//   //res.json(users)
//   res.send("deleted")
// })

/**** PART TWO ****/

// use bodyParser
app.use(bodyParser.json());


// POST users
// set the userId based on the current number of users in the array
// accept user object from body
// push new user object to the users array
// return the new user object
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

// TEST OBJECT
// {
// 	"name": "Audre Lorde",
// 	"occupation": "Writer, Activist",
// 	"avatar": "https://media2.s-nbcnews.com/j/newscms/2018_09/2141201/170901-audre-lord-ew-512p_78c2b49ed1319e7f116d15e0a56ef9e0.fit-760w.jpg"
//  }

/**** PART THREE ****/

// GET /users/:userId
// create a userid variable that can be used in the path
// return the specified user object
app.get('/users/:userId', (req, res) => {
  let userId = req.params.userId

  res.json(users[userId])
})

// PUT /users/:userId
// define a userid variable to select a user from the path
// alter the specified users details if updates are made in the body
// do not alter key values that have not changed
// return the updated user object
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

// TEST OBJECT
// {
// 	"name": "warthog",
//    "occupation": "truffle hunter",
// }

// DELETE /users/:userId
// define a userid variable to select a user from the path
// add a new keyvalue to denote inactive status for the selected user
// return a message confirming the specified user has been deleted
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
