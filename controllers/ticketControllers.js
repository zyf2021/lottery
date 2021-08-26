const Ticket = require('../models/Ticket')
const config = require('config')
//убрать в config
//('sk_test_51JSGYHDrIIHnRlXN7EB8TCpa8tVMTUC92lUvqB3eccF8CvTVPfDFeUvpkOev7rNCRmylkLoTCiKG2en0jSLEP7cu00VovWVdlj');
const stripe = require('stripe')(config.sk_test) 

// middleware или controllers?
const calculateOrderAmount = items => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };

const ticketControllers = {
    getUserTicket: async (req, res) => {
        try {
            //console.log(req.user.userId)
            const tickets = await Ticket.find({owner:req.user.userId})
            res.json(tickets)        
        } catch (e) {
            return res.status(500).json({message:'Ошибка'})
        }
    },
    deleteTicket: async (req, res) => {
        try {
            await Ticket.findByIdAndDelete(req.params.id)
            res.json({message :'Билет удален'})
        } catch (e) {
            return res.status(500).json({message:e.message})
        }
    },
    payTicket: async (req, res) => {
        const {items} = req.body
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
          amount: calculateOrderAmount(items),
          currency: "usd"
        })
        res.send({
          clientSecret: paymentIntent.client_secret
        })
    }
}

module.exports = ticketControllers