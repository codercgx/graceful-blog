const express= require("express")
const router=express.Router()

const albumModel= require('../models/Album')

router.post('/add', async (req,res)=>{
    let { label, content, files } =req.body
    console.log(label);
    console.log(files);
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const mouth = nowDate.getMonth() + 1;
    const day = nowDate.getDate();
    const create_time = `${year}-${mouth}-${day}`;

    const doc= await albumModel.create({
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


module.exports= router