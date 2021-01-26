const mongoose = require('mongoose')
const Schema=mongoose.Schema

const schema= new Schema({
    username: {
        type: String,
        required: true
    },
    captcha: {
        type: String,
        required: true
    }
})
module.exports= mongoose.model('Captcha',schema)