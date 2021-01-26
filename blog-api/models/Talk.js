const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    content: { type: String },
    imgsrc: { type: String },
    datetime: { type: Date, default: null }
})

module.exports = mongoose.model('talk', schema)