const { authSecret } = require('../.env')
const jwt = require('jsonwebtoken')

module.exports = app => {

  // metodo para decodificar o token que será usado pelo multer no arquivo de upload
  const index = (req, res) => {

    let token = null
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      token = req.headers.authorization.split(' ')[1]
    } else {
      return { message: 'Token não encontrado' }
    }

    jwt.verify(token, authSecret, function(err) {
      if (err) {
        console.log({ message: 'Erro, token não identificado' })
        return { message: 'Erro, token não identificado' }
      }
    })

    let decode = jwt.decode(token, authSecret)
    
    if (decode) {
      return res.status(200).json(decode)
    } 

    console.log({ message: 'Não foi possível decodificar o token' })
    return res.status(400).json({ message: 'Não foi possível decodificar o token' })
  }

  return {
    index
  }
}