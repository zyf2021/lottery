const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')


// /api/auth/register
router.post(
    '/register',
    [
        check('first_name', 'Введите имя').notEmpty(),
        check('last_name', 'Введите фамилию').notEmpty(),
        check('phone', 'Введите номер телефона').notEmpty(),
        check('email', 'Некорректный email').isEmail(),
        check('password','Минимальная длина пароля 6 символов').isLength({min:6})
    ] ,
    async(req, res) =>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }
        //получаем поля
        //их будем брать из models
        const{email, first_name, last_name, phone, password, date_create} = req.body
        const candidate = await User.findOne({email})
        if(candidate){
           return res.status(400).json({message:'Такой пользователь уже существует'})
        }
        /*if (check_password != password){
            return res.status(400).json({message:'Пароли не совпадают'})
        }*/
        //else {return res.status(400).json({message:'Пароли типа совпадают?'})}
        const hashedPassword = await bcrypt.hash(password,12)
        const now = new Date()
        const user = new User({email, first_name, last_name, phone, password:hashedPassword, date_create:now})
        
        await user.save()
        res.status(201).json({message:'Пользователь создан'})
    }catch(e){
        res.status(500).json({message:'Что-то не так, попробуйте еще раз Ошибка ниже'})
    }
})

// /api/auth/login
router.post(
    '/login', 
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
                config.get('jwtSecret'),
                {
                    expiresIn:'1h'
                }
            )
            res.json({token, userId:user.id})


        }catch(e){
            res.status(500).json({message:'Что-то не так, попробуйте еще раз'})
        }
    })

module.exports = router