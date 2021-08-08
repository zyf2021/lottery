const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    //code:{type:String},
    ticket1:{type:Number, min:0, max:70},
    ticket2:{type:Number, min:0, max:70},
    ticket3:{type:Number, min:0, max:70},
    ticket4:{type:Number, min:0, max:70},
    ticket5:{type:Number, min:0, max:70},
    //ticket1:{type:Number, min:0, max:70}
    //id_user:{},
    status:{type:Boolean, default: false},//enum - массив допустимых значений
    owner:{type:Types.ObjectId, ref:'User'}
})

module.exports = model('Ticket', schema)