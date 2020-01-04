const { authSecret } = require('../.env')
const jwt = require('jsonwebtoken')

module.exports = app => {

  // metodo para decodificar o token que será usado pelo multer no arquivo de upload
  const index = (headers) => {
    let token = null

    if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
      token = headers.authorization.split(' ')[1]
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
      console.log({ message: 'Token decodificado' })
      return decode
    } 

    console.log({ message: 'Não foi possível decodificar o token' })
    return { message: 'Não foi possível decodificar o token' }
  }

  return {
    index
  }
}