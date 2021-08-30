const Router = require('express-promise-router')
const controller = require('../controller/shorturl')
const validator = require('validator')

const router = new Router()
module.exports = router

router.post('/', async(req, res) => {
  if (!validator.isURL(req.body.url)) {
    res.json({ error: 'invalid url' })
  } else {
    res.json({
      original_url: req.body.url,
      short_url: await controller.getShortURL(req.body.url),
    })
  }
})

router.get('/:short_url', async(req, res) => {
  res.redirect(await controller.getLongURL(req.params.short_url))
})
