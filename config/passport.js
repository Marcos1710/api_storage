const { authSecret } = require('../.env')
const passaport = require('passport')
const passaportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passaportJwt
const { apiAuth, apiFd } = require('./api')

module.exports = app => {
  const authStorage = () => {
    const params = {
      secretOrKey: authSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }
    
    /* o tipo de estratégia muda de acordo com a aplicação que está consumindo a API */
    const strategy = new Strategy(params, (payload, done) => {
      if (payload.id_user) {
        apiAuth.post('/valida/token', {
          authorization: payload.id_user
          
        })
        .then(user => done(null, user ? { ...payload } : false))
        .catch(err => done(err, false))
      } else if (payload.id_tag_ficha) {
        apiFd.get('/decode/tag/token', {
          authorization: payload.id_user
          
        }) 
        .then(user => done(null, user ? { ...payload } : false))
        .catch(err => done(err, false))
      }
    })
  
    passaport.use(strategy)
    return passaport.authenticate('jwt', { session: false })
  }

  return {
    authStorage
  }
}