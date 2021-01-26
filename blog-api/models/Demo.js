const mongoose=require('mongoose')
const Schema=mongoose.Schema

const schema=new Schema({
    video_path: {type: String},
    video_pic:{type: String},
    content:{type: String},
    datetime:{type: Date,default: null},
    code_path:{type: String}
})

module.exports=mongoose.model('demo',schema)