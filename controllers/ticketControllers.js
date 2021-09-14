const Ticket = require('../models/Ticket')
const User = require('../models/User')
const config = require('config')
//убрать в config
//('sk_test_51JSGYHDrIIHnRlXN7EB8TCpa8tVMTUC92lUvqB3eccF8CvTVPfDFeUvpkOev7rNCRmylkLoTCiKG2en0jSLEP7cu00VovWVdlj');
const stripe = require('stripe')(config.sk_test) 

// middleware или controllers?
const calculateOrderAmount = items => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1000;
  };

const ticketControllers = {
    getUserTicket: async (req, res) => {
        try {
            //console.log(req.user.userId)
            const tickets = await Ticket.find({owner:req.user.userId})
            const user = await User.findById(req.user.userId)
            res.json({tickets, user})        
        } catch (e) {
            return res.status(500).json({message:e.message})
        }
    },
    deleteTicket: async (req, res) => {
        try {
            await Ticket.findByIdAndDelete(req.params.id)
            res.json({message :'Билет удален'})
        } catch (e) {
            return res.status(500).json({message:e.message + " deleteTicket"})
        }
    },
    payTicket: async (req, res) => {
        const idTicket = req.params.id
        const {items} = req.body
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "usd"
          })
        const exist = await Ticket.findOne({_id: idTicket})
        const now = new Date()
        if (exist){
            await Ticket.findOneAndUpdate({_id: exist._id}, {
                date_pay: now, status: "1" 
            })
            //await Ticket.deleteMany({status: 0})
        }
        // Create a PaymentIntent with the order amount and currency
       
        res.send({
          clientSecret: paymentIntent.client_secret
        })
        //console.log(req.body)
       // res.json({message:idTicket})
        
    }
}

module.exports = ticketControllers