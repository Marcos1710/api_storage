const moment = require('moment')
const path = require('path')

module.exports = app => {

  // Método para realizar o upload da imagem do documento vindo do OCR
  const store = async (req, res) => {
    
    let name = ''
    let img_documento  = req.file
    let  { nome_fantasia } = await app.config.decodeJwt.index(req.headers)
    let pasta_hotel = nome_fantasia.split(' ')
    let dateAtual = moment().format('YYYY-MM-DD')

    pasta_hotel.forEach(hotel => {
      name += hotel + '_' 
    })

    console.log({ message: 'Imagem do documento salva no storage' })
    return res.status(200).json({ name: path.resolve(name, dateAtual, img_documento.originalname)})
  }

  return {
    store
  }
}