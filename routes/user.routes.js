const {Router} =require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')

const router = Router()

//'/api/user/profile'
router.get(
    '/profile',
    auth,
    async(req,res) => {
        try{
            const user = await User.findOne({id:req.user.userId})
            res.json(req.user)
        }
        catch(e){
            res.status(500).json({ message: 'Ошибка в роутах'})
        }
    }
)

module.exports = router