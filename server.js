const express = require('express')

const app = express()
const cors = require('cors')

// settings
app.use(cors({ optionsSuccessStatus: 200 }))

// endpoints
app.get('/api/whoami', (req, res) => {
  res.json({
    ipaddress: req.header('X-Forwarded-For'),
    language: req.header('Accept-Language'),
    software: req.header('User-Agent'),
  })
})

// app
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
