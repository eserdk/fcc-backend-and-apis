const express = require('express')

const app = express()
const cors = require('cors')

// settings
app.use(cors({ optionsSuccessStatus: 200 }))

// endpoints
app.get('/api/:date?', (req, res) => {
  const date = req.params.date == null ? new Date() : new Date(
    Number.isNaN(req.params.date) ? req.params.date : parseInt(
      req.params.date, 10))
  res.json(date instanceof Date && !isNaN(date) ? {
    unix: date.getTime(),
    utc: date.toUTCString(),
  } : { error: 'Invalid Date' })
})

// app
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
