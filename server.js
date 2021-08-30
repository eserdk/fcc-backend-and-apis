const express = require('express')
const cors = require('cors')
const multer  = require('multer')
const uploads = multer({dest: 'uploads/'})
const PORT = process.env.PORT || 3000

express().
  use('/public', express.static(process.cwd() + '/public')).
  use(cors({ optionsSuccessStatus: 200 })).
  use(express.urlencoded({ extended: true })).
  get('/', (req, res) => {res.sendFile(process.cwd() + '/views/index.html')}).
  post('/api/fileanalyse', uploads.single('upfile'), (req, res) => {
    return res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    })
  }).
  listen(PORT, () => {console.log('Your app is listening on port ' + PORT)})
