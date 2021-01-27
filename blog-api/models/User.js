const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    username: { type: String, required: true },
    password: {
        type: String, required: true, select: true,
        set(val) {
            return require('bcryptjs').hashSync(val, 10)
        },
    },
    email: { type: String, required: true },
    info: { type: String, required: true, default: '这里还是空的，写一些你的介绍吧~' },
    avatar: { type: String, required: true, default: 'http://localhost:3000/images/caa3ffe24938807296443c7a34d9d5a5.jpg' },
    registerTime: { type: String, default: new Date() }
})

module.exports = mongoose.model('User', schema)




