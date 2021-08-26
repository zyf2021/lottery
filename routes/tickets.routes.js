//отвечают за CRUD-ticket
const {Router} = require('express')

const Ticket = require('../models/Ticket')
const ticketControllers = require('../controllers/ticketControllers')
const auth = require('../middleware/auth.middleware')

const {check, validationResult} = require('express-validator')
const router = Router()


///api/tickets/create
router.post('/create', 
    [
        check('ticket1', 'Заполните поле').isLength({min:1, max: 70}),
        check('ticket2', 'Заполните поле').isLength({min:1, max: 70}),
        check('ticket3', 'Заполните поле').isLength({min:1, max: 70}),
        check('ticket4', 'Заполните поле').isLength({min:1, max: 70}),
        check('ticket5', 'Заполните поле').isLength({min:1, max: 70}),
    ] ,
    auth, async(req,res)=>{
    try {
        //const baseUrl = config.get('baseUrl')
        const {ticket1, ticket2, ticket3, ticket4, ticket5} = req.body

        const exist = await Ticket.findOne({ticket1, ticket2, ticket3, ticket4, ticket5})

        if (exist){
            return res.json({message:'Такой билет уже существует'})
        }

        const ticket = new Ticket({
            ticket1, ticket2, ticket3, ticket4, ticket5, owner: req.user.userId
        })

        await ticket.save()

        res.status(201).json({message: 'Билет создан'})
        //console.log(req);

    } catch (e) {
        res.status(500).json({message:'Ошибка'})
    }
})

// /api/tickets/payment
router.post('/payment', ticketControllers.payTicket)

///api/tickets/
router.get('/', auth, ticketControllers.getUserTicket)

//api/tickets/delete/:id
router.get('/delete/:id', auth, ticketControllers.deleteTicket)


module.exports = router