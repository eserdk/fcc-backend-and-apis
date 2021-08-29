const express = require('express')

const app = express()
const cors = require('cors')
const redis = require('redis').createClient(process.env.REDIS_URL)
const dns = require('dns')
const md5 = require('crypto-js/md5')
const b64 = require('crypto-js/enc-base64url')

// settings
app.use(cors({ optionsSuccessStatus: 200 }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// helper
function get_key (string) {
  return b64.stringify(md5(string)).substring(0, 8)
}

// endpoints
app.post('/api/shorturl', (req, res) => {
  dns.lookup(req.body.url, (err, address) => {
    if (err || !address) {
      console.log(err)
      console.log(address)
      res.json({ error: 'invalid url' })
    } else {
      const key = get_key(req.body.url)
      redis.set(key, req.body.url)
      res.json({ original_url: req.body.url, short_url: key })
    }
  })
})

app.get('/api/shorturl/:short_url', (req, res) => {
  redis.get(req.params.short_url, (err, reply) => {
    if (!err && reply) {
      res.redirect(reply)
    } else {
      res.json({ error: 'invalid url' })
    }
  })
})

// app
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
