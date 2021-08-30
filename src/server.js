const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const PORT = process.env.PORT || 3000

express().
  use('/public', express.static(process.cwd() + '/public')).
  use(cors({ optionsSuccessStatus: 200 })).
  use(express.urlencoded({ extended: true })).
  get('/', (req, res) => {res.sendFile(process.cwd() + '/views/index.html')}).
  use('/api/users', routes.tracker).
  use('/api/fileanalyse', routes.fileanalyse).
  use('/api/whoami', routes.parser).
  use('/api/:date?', routes.timestamp).
  use('/api/shorturl', routes.shortener).
  listen(PORT, () => {console.log('Your app is listening on port ' + PORT)})
