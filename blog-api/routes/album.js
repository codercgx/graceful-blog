const express = require("express")
const router = express.Router()
const fs = require('fs')
const path = require('path')
const albumModel = require('../models/Album')


router.post('/add', async (req, res) => {
    let { label, content, files } = req.body
    console.log(label);
    console.log(files);
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const mouth = nowDate.getMonth() + 1;
    const day = nowDate.getDate();
    const create_time = `${year}-${mouth}-${day}`;

    const doc = await albumModel.create({
        label,
        content,
        files,
        create_time
    })

    return res.send({
        code: 0,
        data: {
            album: doc
        }
    })
})


router.get('/list', async (req, res) => {
    let tempAlbumArr = []
    const docs = await albumModel.find()
    docs.forEach(item => {
        tempAlbumArr.push({
            label: item.label,
            files: item.files,
            create_time: item.create_time
        })
    })
    res.send({
        code: 0,
        data: {
            albumList: tempAlbumArr
        }
    })
})

router.get('/delete', async (req, res) => {
    const id = req.query.id
    console.log(id);
    const doc = await albumModel.findByIdAndDelete(id)
    res.send(doc)
})

module.exports = router