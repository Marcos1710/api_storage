module.exports = app => {

  // Método para realizar o upload do pdf do termo do hotel
  const store = async (req, res) => {
    
    let pdf  = req.file
    let caminho = pdf.path.substr(14)

    console.log({ message: 'Dados do hotel salvo no storage' })
    return res.status(200).json({ name: 'https://st4-hfgtdg124cvt.economysoftware.com.br/' + caminho })
  }

  return {
    store
  }
}