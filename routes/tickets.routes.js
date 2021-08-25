//отвечают за CRUD-ticket
const {Router} = require('express')
const config = require('config')
const Ticket = require('../models/Ticket')
const ticketControllers = require('../controllers/ticketControllers')
const auth = require('../middleware/auth.middleware')
//убрать в config
//('sk_test_51JSGYHDrIIHnRlXN7EB8TCpa8tVMTUC92lUvqB3eccF8CvTVPfDFeUvpkOev7rNCRmylkLoTCiKG2en0jSLEP7cu00VovWVdlj');
const stripe = require('stripe')(config.sk_test) 
const {check, validationResult} = require('express-validator')
const router = Router()

// middleware или controllers?
const calculateOrderAmount = items => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };


///api/ticket/create
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

// /api/ticket/payment

router.post('/payment', async (req, res) => {
    const {items} = req.body
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd"
    })
    res.send({
      clientSecret: paymentIntent.client_secret
    })
  })

///api/tickets/
router.get('/', auth, ticketControllers.getUserTicket)

//api/tickets/delete/:id
router.get('/delete/:id', auth, ticketControllers.deleteTicket)


module.exports = router