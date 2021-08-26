const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const sendMail = require('../controllers/sendMail')
const userControllers = require('../controllers/userControllers')
const {activation_token, access_token, refresh_token, baseUrl_3000, jwtSecret} = require('config')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')

const createActivationToken = (payload) => {
    return jwt.sign(payload.toJSON(), activation_token, {expiresIn: '5m'})
}
/*
    const createAccessToken = (payload) => {
        return jwt.sign(payload, access_token, {expiresIn: '15m'})
    }

    const createRefreshToken = (payload) => {
        return jwt.sign(payload, refresh_token, {expiresIn: '7d'})
    }
*/


// /api/auth/register
router.post('/register',
    [
        check('first_name', 'Введите имя').notEmpty(),
        check('last_name', 'Введите фамилию').notEmpty(),
        check('phone', 'Введите номер телефона').notEmpty(),
        check('email', 'Некорректный email').isEmail(),
        check('password','Минимальная длина пароля 6 символов').isLength({min:6})
    ], 
    async (req, res) =>{
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }
            //получаем поля их будем брать из models
            const{email, first_name, last_name, phone, password} = req.body
            const candidate = await User.findOne({email})
            if(candidate){
               return res.status(400).json({message:'Такой пользователь уже существует'})
            }
            const hashedPassword = await bcrypt.hash(password,12)
            const now = new Date()
            const user = new User({email, first_name, last_name, phone, password:hashedPassword, date_create:now})     
            
            const token = createActivationToken(user)

            console.log({token})
            //jwt.sign({userId: user.id}, activation_token, {expiresIn: '5m'}) //createActivationToken
            
            const url = `${baseUrl_3000}/activate/${token}`

            sendMail(email, url, "Verify your email address")
            res.json({message: "Register Success! Please activate your email to start."})
            
            //Сохранение пользователя (в /activate)
            //await user.save()
            //res.status(201).json({message:'Пользователь создан'})
        }catch(e){
            res.status(500).json({message: e.message})
            
        }
    }
)
// /api/auth/activation
router.post('/activation', userControllers.activateEmail)

// /api/auth/login
router.post('/login', 
    [
        check('email', 'Некорртектный email').normalizeEmail().isEmail(),
        check('password','Введите пароль').exists()
    ] ,
    async(req, res) =>{
        try{
            //console.log('Body:', req.body)
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Введены некорректные данные при входе'
                })
            }
            const{email,password} = req.body
        
        
            const user = await User.findOne({email})

            if(!user){
                return res.status(400).json({message:'Пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch){
                return res.status(400).json({message:'Неверный пароль, попробуйте снова'})
            }
       
            const token = jwt.sign(
                {
                    userId: user.id
                },
                jwtSecret,
                {
                    expiresIn:'1h'
                }
            )
            res.json({message:'Вход выполнен', token, userId:user.id}) //Responce 
            
        }catch(e){
            res.status(500).json({message:'Что-то не так, попробуйте еще раз'})
        }
    })

//logout?
module.exports = router