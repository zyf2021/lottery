const {Schema, model} = require('mongoose')

const schema = new Schema({
    code:{type:String},
    //id_user:{},
    status:{type:Boolean}
})

module.exports = model('Ticket', schema)