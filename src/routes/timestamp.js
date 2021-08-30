const Router = require('express-promise-router')

const router = new Router()
module.exports = router

router.get('/', (req, res) => {
  const date = req.params.date == null ? new Date() : new Date(
    isNaN(req.params.date) ? req.params.date : parseInt(req.params.date))
  res.json(date instanceof Date && !isNaN(date) ? {
    unix: date.getTime(),
    utc: date.toUTCString(),
  } : { error: 'Invalid Date' })
})