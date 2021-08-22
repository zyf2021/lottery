const Ticket = require('../models/Ticket')

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
    }
}

module.exports = ticketControllers