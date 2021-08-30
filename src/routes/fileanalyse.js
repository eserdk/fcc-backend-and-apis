const Router = require('express-promise-router')
const multer = require('multer')
const uploads = multer({ dest: 'uploads/' })

const router = new Router()
module.exports = router

router.post('/', uploads.single('upfile'), (req, res) => {
  return res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  })
})
