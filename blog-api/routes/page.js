const express = require('express')
const router = express.Router()
const MessageModel = require('../models/Message')
const ArticleModel = require('../models/Article')

router.get('/pageSize', async (req, res) => {
    let { page } = req.query
    const message = {}
    let Pagesize = 10
    page = (page - 1) * Pagesize
    const count = await MessageModel.countDocuments()
    const doc=await MessageModel.find().sort({_id: 1}).limit(page)
    message.count=count
    if(message.count>0){

    }

})


router.get('/getnotePage', async (req,res)=>{
    let {page}=req.query
    const message={}
    const Pagesize=3
    page = (page - 1) * Pagesize;
    let count=await ArticleModel.countDocuments()
    message.count=count
    let doc=await ArticleModel.find().sort({_id: 1}).limit(page)
    message.data=doc
    res.send({err: 0,message})
})

module.exports = router