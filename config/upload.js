const multer = require('multer')
const path = require('path')
const { authSecret } = require('../.env')
const jwt = require('jsonwebtoken')
const fs = require('fs')

module.exports =  {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let token = null

      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1]
      } else {
        return false
      }

      let { nome_fantasia } = jwt.decode(token, authSecret)

      if (fs.existsSync(path.resolve(__dirname,  '..', '..', '..', 'storage_fd', nome_fantasia))) {
        cb(null, path.resolve(__dirname,  '..', '..', '..', 'storage_fd', nome_fantasia))
      } else {
        fs.mkdirSync(path.resolve(__dirname,  '..', '..', '..', 'storage_fd', nome_fantasia))
        cb(null, path.resolve(__dirname,  '..', '..', '..', 'storage_fd', nome_fantasia))
      }
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      const name = path.basename(file.originalname, ext)
      cb(null, `${name}-${Date.now()}${ext}`)
    }
  })  
}