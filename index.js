const express = require('express')
const app = express()
const cors = require('cors')
const { application } = require('express')
const bodyParser = require('body-parser')
const shortid = require('shortid')

require('dotenv').config()

var users = []

app.use(cors())
app.use(express.static('public'))

app.use(bodyParser.urlencoded( { extended: false }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/users/:_id/logs', (req, res) => {
    
  user = users.find((item, index) => {
    return item._id === req.params._id
  })

  res.json(user)

})



app.post('/api/users/:_id/exercises', (req, res) => {

  // get user 
  user = users.find((item, index) => {
    return item._id === req.params._id
  })


  // get list of log entries
  var logs
  if (user.log) {
    logs = user.log
  } else {
    logs = []
  }

  var date = req.body.date
  if (date == '') {
    date = new Date().toDateString()
  } else {
    date = new Date(date).toDateString()

  }


  console.log('*** date', date)

  user.description =  req.body.description
  user.duration = Number(req.body.duration)
  user.date = date


  logs.push({ description: req.body.description, duration: req.body.duration, date: date  })

  //user.log = logs 

  //user.count = logs.length

  //console.log('*** logs: ', user.log)

  


  res.json(user)

})



app.get('/api/users', (req, res) => {
  res.json(users)
})

app.post('/api/users', (req, res) => {
  //console.log(req.body.username)
  newUser = { username: req.body.username, _id: shortid.generate() }

  users.push(newUser)

  res.json(newUser )
})


const listener = app.listen(process.env.PORT || 8080, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
