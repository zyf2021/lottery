const {Router} = require('express')
const router = Router()
const uploadControllers = require('../controllers/uploadControllers')
const uploadImage = require('../middleware/uploadImage.middleware')
const auth = require('../middleware/auth.middleware')

// /api/upload_avatar
router.post('/upload_avatar', uploadImage)

module.exports = router