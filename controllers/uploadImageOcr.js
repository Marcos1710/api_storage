module.exports = app => {

  // Método para realizar o upload da imagem do documento vindo do OCR
  const store = async (req, res) => {
    
    let img_documento  = req.file
    let caminho = img_documento.path.substr(14)

    console.log({ message: 'Imagem do documento salva no storage' })
    return res.status(200).json({ name: 'http://ec2-18-231-198-90.sa-east-1.compute.amazonaws.com/' + caminho})
  }

  return {
    store
  }
}