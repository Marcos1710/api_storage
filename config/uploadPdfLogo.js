const multer = require('multer')
const path = require('path')
const fs = require('fs')

module.exports = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let nome_fantasia = ''
      let pathDir = path.resolve(__dirname, '..', '..', '..', 'storage_fd')
      let pathSistema = 'ficha_digital' // futuramente ver uma forma dessa informação pegar do token 
      
      if (req.headers.nomefantasia) {
        let nome = req.headers.nomefantasia.split(' ')

        nome.forEach(hotel => {
          nome_fantasia += hotel + '_' 
        })
      } else {
        return { message: 'Nome fantasia não encontrado no headers', error: 404, status: false }
      }

      // Verifica se a pasta do hotel já existe 
      if (fs.existsSync(path.resolve(pathDir, pathSistema, nome_fantasia))) {
        cb(null, path.resolve(pathDir, pathSistema, nome_fantasia))
      } else {
        fs.mkdirSync(path.resolve(pathDir, pathSistema, nome_fantasia))
        cb(null, path.resolve(pathDir, pathSistema, nome_fantasia))
      }
    },
    filename: (req, file, cb) => {
      let nome_fantasia = ''

      if (req.headers.nomefantasia) {
        let nome = req.headers.nomefantasia.split(' ')

        nome.forEach(hotel => {
          nome_fantasia += hotel + '_' 
        })
      } else {
        return { message: 'Nome fantasia não encontrado no headers' }
      }

      const ext = path.extname(file.originalname)
      const name = path.basename(nome_fantasia, ext)

      if (ext === '.pdf') {
        cb(null, `${name}${ext}`)  
      } else {
        cb(null, `${name}.png`)  
      }
    }
  })  
} 

