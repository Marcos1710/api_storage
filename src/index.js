const app = require('express')() 
const consign = require('consign')
const multer = require('multer')
const uploadConfig = require('../config/upload')
const uploadConfigPdfLogo = require('../config/uploadPdfLogo')
const upload = multer(uploadConfig)
const uploadPdfLogo = multer(uploadConfigPdfLogo)

app.upload = upload
app.uploadPdfLogo = uploadPdfLogo

consign()
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./config/decodeJwt.js')
  .then('./controllers')
  .then('./config/routes.js')
  .into(app)

app.listen(3327, () => {
  console.log('Storage Executando...')
})