const mongoose = require('mongoose')
module.exports = (app) => {
    mongoose.connect('mongodb://127.0.0.1:27017/blog', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}