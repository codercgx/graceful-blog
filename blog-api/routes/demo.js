const express = require('express')
const router = express.Router()
const demoModel = require('../models/Demo')

router.post('/add', async (req, res) => {
    let { title, label, description, codeContent, files } = req.body
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const mouth = nowDate.getMonth() + 1;
    const day = nowDate.getDate();
    const create_time = `${year}-${mouth}-${day}`;
    const doc = await demoModel.create({
        title, label, files, description, codeContent, create_time
    })
    return res.send({
        code: 0,
        data: {
            demo: doc
        }
    })
})

router.get('/list', async (req, res) => {
    const data = await demoModel.find()
    return res.send({
        code: 0,
        data: {
            demoList: data
        }
    })
})


router.get('/detail/:id', async (req, res) => {
    const id = req.params.id
    const demoDetail = await demoModel.findById(id)
    return res.send({
        code: 0,
        data: {
            demoDetail
        }
    })
})
module.exports = router