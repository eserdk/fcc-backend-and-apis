const Router = require('express-promise-router')

const router = new Router()
module.exports = router

router.get('/', (req, res) => {
  res.json({
    ipaddress: req.header('X-Forwarded-For'),
    language: req.header('Accept-Language'),
    software: req.header('User-Agent'),
  })
})