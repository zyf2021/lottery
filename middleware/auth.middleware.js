const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
    try {
        //return res.status(401).json({ message: req.headers })
        const token = req.headers.athorization.split(' ')[1] // "Bearer TOKEN"
        //return res.status(401).json({ message: token })
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