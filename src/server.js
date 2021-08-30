const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const PORT = process.env.PORT || 3000

express().
  use('/public', express.static(process.cwd() + '/src/public')).
  use(cors({ optionsSuccessStatus: 200 })).
  use(express.urlencoded({ extended: true })).
  get('/', (req, res) => {res.sendFile(process.cwd() + '/src/views/index.html')}).
  use('/api/users', routes.tracker).
  use('/api/fileanalyse', routes.fileanalyse).
  get('/api/whoami', (req, res) => {
    res.json({
      ipaddress: req.header('X-Forwarded-For'),
      language: req.header('Accept-Language'),
      software: req.header('User-Agent'),
    })
  }).
  get('/api/:date?', (req, res) => {
    const date = req.params.date == null ? new Date() : new Date(
      isNaN(req.params.date) ? req.params.date : parseInt(req.params.date))
    res.json(date instanceof Date && !isNaN(date) ? {
      unix: date.getTime(),
      utc: date.toUTCString(),
    } : { error: 'Invalid Date' })
  }).
  use('/api/:date?', routes.timestamp).
  use('/api/shorturl', routes.shortener).
  listen(PORT, () => {console.log('Your app is listening on port ' + PORT)})
