const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const schema = new Schema({
    title: { type: String, default: null, required: true },
    introduction: { type: String, default: null, required: true },
    content: { type: String, default: null, required: true },
    cover_src: { type: String, default: null, required: true },
    visited: { type: Number, default: 0 },
    like_stars: { type: Number, default: 0 },
    label: [{
        name: {
            type: String, default: null, required: true
        }
    }],


    create_time: { type: String, default: new Date() },
})

module.exports = mongoose.model('Article', schema)