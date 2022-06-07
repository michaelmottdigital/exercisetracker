const express = require('express')
const app = express()
const cors = require('cors')
const { application } = require('express')
const bodyParser = require('body-parser')
const shortid = require('shortid')

require('dotenv').config()

var users = []
var logs = []

app.use(cors())
app.use(express.static('public'))

app.use(bodyParser.urlencoded( { extended: false }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/users/:_id/logs', (req, res) => {
    
  //console.log(req.params._id)
  console.log('*** logs', logs)
  activity = logs.filter((item, index) => {
    return item._id === req.params._id
  })

  user = users.find((item, index) => {
    return item._id === req.params._id
  })


  result = {
    _id: user._id,
    username: users.username,
    count: activity.length,
    logs: activity

  }

  //console.log('*** activity', activity)
  res.json(result)

})



app.post('/api/users/:_id/exercises', (req, res) => {

  // get user 
  user = users.find((item, index) => {
    return item._id === req.params._id
  })



  var date = req.body.date
  if (date == '') {
    date = new Date().toDateString()
  } else {
    date = new Date(date).toDateString()

  }


  //console.log('*** date', date)

  user.description =  req.body.description
  user.duration = Number(req.body.duration)
  user.date = date


  logs.push({ _id: req.params._id ,description: req.body.description, duration: Number(req.body.duration), date: date  })

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
