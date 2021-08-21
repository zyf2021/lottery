const User = require('../models/User')

const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.user.userId})
        if (user.role !== "Admin"){
            return res.status(500).json({message:"Права администратора недоступны"})
        }
        next()
  } catch (e) {
    res.status(401).json({ message: e.message })
  }
}