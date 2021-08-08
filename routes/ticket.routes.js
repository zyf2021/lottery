//отвечают за CRUD-ticket
const {Router} = require('express')
//const config = require('config')
const Ticket = require('../models/Ticket')
const auth = require('../middleware/auth.middleware')
const router = Router()

///api/ticket/create
router.post('/create', auth, async(req,res)=>{
    try {
        //const baseUrl = config.get('baseUrl')
        const {ticket1, ticket2, ticket3, ticket4, ticket5} = req.body

        const exist = await Ticket.findOne({ticket1, ticket2, ticket3, ticket4, ticket5})

        if (exist){
            return res.json({message:'Существует'})
        }

        const ticket = new Ticket({
            ticket1, ticket2, ticket3, ticket4, ticket5, owner: req.user.userId
        })

        await ticket.save()

        res.status(201).json({ticket})

    } catch (e) {
        res.status(500).json({message:'Ошибка'})
    }
})

///api/ticket/list
router.get('/list', auth, async(req,res) =>{
    try {
        const ticket = await Ticket.find({owner:req.user.userId})
        res.json(ticket)        
    } catch (e) {
        res.status(500).json({message:'Ошибка'})
    }
})



module.exports = router