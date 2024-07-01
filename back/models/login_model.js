const mongoose = require('mongoose');


const uniqueValidator = require('mongoose-unique-validator')

const loginSchema = mongoose.Schema({
    email : {type :String ,required :true, unique : true   },
    password : {type :String ,required :true}})
loginSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User' , loginSchema);