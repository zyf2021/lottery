const { Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email:{type:String, required:true, unique:true},
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    phone:{type:String},
    //avatar:{type: Image},
    password:{type:String, required:true},
    role:{type:String, default:"User"},
    verification:{type:Boolean, default:false},
    tickets:[{type: Types.ObjectId, ref: 'Ticket'}],
    date_create:{type:Date}
})

module.exports = model('User', schema)