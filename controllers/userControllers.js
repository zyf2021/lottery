const Users = require('../models/User')
//const {activation_token, access_token, refresh_token, baseUrl} = require('config')

const config = require('config')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//const sendMail = require('./sendMail')

const userControllers = {
    
    /*register: async (req, res) =>{
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
            const hashedPassword = await bcrypt.hash(password,12)
            const now = new Date()
            const user = new User({email, first_name, last_name, phone, password:hashedPassword, date_create:now})
            
            await user.save()
    
            //const activation_token = createActivationToken(newUser)
            //const url = `${CLIENT_URL}/user/activate/${activation_token}`
    
            //sendMail(email, url, "Verify your email address")
    
            //res.json({msg: "Register Success! Please activate your email to start."})
            
            res.status(201).json({message:'Пользователь создан'})
        }catch(e){
            res.status(500).json({message:'Что-то не так, попробуйте еще раз Ошибка ниже'})
        }  
    }*/
    
    activateEmail: async (req, res) => {
        try {
            const {token} = req.body
            const user = jwt.verify(token, config.get('activation_token'))

            console.log({user})
            const {email, first_name, last_name, phone, password, date_create} = user

            const check = await Users.findOne({email})
            if(check) return res.status(400).json({message:"This email already exists."})

            const newUser = new Users({email, first_name, last_name, phone, password, verification: true, date_create})

            await newUser.save()

            res.json({message: "Account has been activated!"})

        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const {name, avatar} = req.body
            await Users.findOneAndUpdate({_id: req.user.id}, {
                name, avatar
            })

            res.json({msg: "Update Success!"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    },
    getUserInfo: async (req, res) => {
        try {
            const user = await Users.findById({_id:req.user.userId}).select('-password')
            console.log("USER", user)
            res.json(user)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    },
    getUsersAllInfo: async (req, res) => {
        try {
            const users = await Users.find().select('-password')

            res.json(users)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const {first_name/*last_name, phone, email, avatar*/} = req.body
            await Users.findOneAndUpdate(
                {
                    _id: req.user.userId
                }, 
                {
                    first_name,
                    /*avatar*/
                })

            res.json({message: "Update Success!"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    },
    updateUsersRole: async (req, res) => {
        try {
            const {role} = req.body

            await Users.findOneAndUpdate(
                {_id: req.params.id}, //params не user, получаем из пути
                {role})  
            res.json({message: "Update Success!", role})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)

            res.json({message: "Deleted Success!"})
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    },
}

/*const createActivationToken = (payload) => {
    return jwt.sign(payload, activation_token, {expiresIn: '5m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, access_token, {expiresIn: '15m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, refresh_token, {expiresIn: '7d'})
}*/

module.exports = userControllers
