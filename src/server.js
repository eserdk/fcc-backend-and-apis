const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const PORT = process.env.PORT || 3000

express().
  use(cors({ optionsSuccessStatus: 200 })).
  use(express.urlencoded({ extended: true })).
  use('/api/users', routes.users).
  get('/api/ping', (req, res) => {res.send('pong')}).
  listen(PORT, () => {console.log('Your app is listening on port ' + PORT)})
