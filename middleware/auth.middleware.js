const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
    try {
        /*return res.status(401).json({ message: req.headers//.athorization//.split(' ')[1]
        })*/
        ///athorization и authorization
        var token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
        /*if (!token) {
          token = req.headers.athorization.split(' ')[1]
        }*/
        if (!token) {
         return res.status(401).json({ message: 'Нет авторизации' })
        }
        const decoded = jwt.verify(token, config.get('jwtSecret'))        
        req.user = decoded
        next()

  } catch (e) {
    res.status(401).json({ message: 'Проблема с расшифровкой токена' })
  }
}