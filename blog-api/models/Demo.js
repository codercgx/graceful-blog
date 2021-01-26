const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    title: {
        type: String,
        default: true
    },
    label: [
        {
            name: {
                type: String,
                default: true
            }
        }
    ],
    files: [
        {
            file_url: {
                type: String
            }
        }
    ],
    description: {
        type: String,
        default: true
    },
    codeContent: {
        type: String,
        default: true
    },
    create_time: {
        type: Date,
        default: new Date()
    }
})

module.exports=mongoose.model('demo',schema)