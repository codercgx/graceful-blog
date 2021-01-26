const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    label: [{
        name: {
            type: String
        }
    }],
    content: {
        type: String,
    },

    files: [{
        file_url: {
            type: String,
        }
    }],

    create_time: { type: Date, default: new Date() }
})

module.exports = mongoose.model('Album', schema)