const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    Imgsrc: { type: String, required: true },
    value: { type: String, required: true, default: null },
    date: { type: Date, default: new Date() }

})

module.exports = mongoose.model('message',schema)