const moment = require('moment')
const path = require('path')

module.exports = app => {

  // Método para realizar o upload da imagem do documento vindo do OCR
  const store = async (req, res) => {
    
    let img_documento  = req.file

    console.log({ message: 'Imagem do documento salva no storage' })
    return res.status(200).json({ name: path.resolve(img_documento.path)})
  }

  return {
    store
  }
}