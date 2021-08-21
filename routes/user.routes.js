const {Router} =require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const authAdmin = require('../middleware/authAdmin.middleware')
const userControllers = require('../controllers/userControllers')

const router = Router()

//'/api/user/profile'
router.get('/profile',  auth,
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
//'/api/user/info'
router.get('/info', auth, userControllers.getUserInfo)

//'/api/user/all_info'
router.get('/all_info', auth, authAdmin, userControllers.getUsersAllInfo)

// '/api/user/update'
router.patch('/update', auth, userControllers.updateUser)

// '/api/user/update_role'
router.patch('/update_role/:id', auth, authAdmin, userControllers.updateUsersRole)

// '/api/user/update_role'
router.delete('/delete/:id', auth, authAdmin, userControllers.deleteUser)

module.exports = router