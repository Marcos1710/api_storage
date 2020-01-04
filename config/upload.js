const multer = require('multer')
const path = require('path')
const { authSecret } = require('../.env')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const moment = require('moment')

module.exports = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let token = null
      let pathDir = path.resolve(__dirname,  '..', '..', '..', 'storage_fd')
      let pathSistema = 'ficha_digital' // futuramente ver uma forma dessa informação pegar do token 
      let dateAtual = moment().format('DD-MM-YYYY')

      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1]
      } else {
        return { message: 'Token não encontrado' }
      }

      jwt.verify(token, authSecret, function(err) {
        if (err) {
          console.log({ message: 'Erro, token não identificado' })
          return { message: 'Erro, token não identificado' }
        }
      })

      let { nome_fantasia } = jwt.decode(token, authSecret)

      // Verifica se as pastas tanto do hotel quanto da data atual já existem para poder criar 
      if (fs.existsSync(path.resolve(pathDir, pathSistema, nome_fantasia))) {
        if (fs.existsSync(path.resolve(pathDir, pathSistema, nome_fantasia, dateAtual))) {
          cb(null, path.resolve(pathDir, pathSistema, nome_fantasia, dateAtual))
        } else {
          fs.mkdirSync(path.resolve(pathDir, pathSistema, nome_fantasia, dateAtual))
          cb(null, path.resolve(pathDir, pathSistema, nome_fantasia, dateAtual))
        }
      } else {
        fs.mkdirSync(path.resolve(pathDir, pathSistema, nome_fantasia))
        fs.mkdirSync(path.resolve(pathDir, pathSistema, nome_fantasia, dateAtual))
        cb(null, path.resolve(pathDir, pathSistema, nome_fantasia, dateAtual))
      }
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      const name = path.basename(file.originalname, ext)
      cb(null, `${name}-${Date.now()}${ext}`)
    }
  })  
}