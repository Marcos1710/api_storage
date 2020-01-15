module.exports = app => {

  // Método para realizar o upload do pdf do termo do hotel
  const store = async (req, res) => {
    
    let pdf  = req.file
    console.log({ message: 'Dados do hotel salvo no storage' })
    return res.status(200).json({ name: pdf.path })
  }

  return {
    store
  }
}