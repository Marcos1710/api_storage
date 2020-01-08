module.exports = app => {

  // Método para realizar o upload da imagem da assinatura vindo do tablet
  const store = async (req, res) => {
    
    let img_assinatura  = req.file
    let caminho = 'http://ec2-18-231-198-90.sa-east-1.compute.amazonaws.com/' + img_assinatura.path.substr(14)
    
    console.log({ message: 'Imagem da assinatura salva no storage' })
    return res.status(200).json({ name: caminho})
  }

  return {
    store
  }
}