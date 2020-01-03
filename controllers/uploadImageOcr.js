module.exports = app => {

  // Método para realizar o upload da imagem do documento vindo do OCR
  const store = (req, res) => {
    let img_documento  = req.file
    console.log({ message: 'Imagem do documento salva no storage' })
    return res.status(200).json({ name: img_documento.originalname })
  }

  return {
    store
  }
}