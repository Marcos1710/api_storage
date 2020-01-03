const multer = require('multer')
const path = require('path')
const jwtDecode = require('./decodeJwt')

module.exports =  {
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {

      // necessário usar essa váriavel para decodificar o token JWT e especificar a criação das pastas 
      
      let decodeToken = await jwtDecode.index 

      console.log(decodeToken)
      cb(null, path.resolve(__dirname,  '..', '..', '..', 'storage_fd'))
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      const name = path.basename(file.originalname, ext)
      cb(null, `${name}-${Date.now()}${ext}`)
    }
  })  
}