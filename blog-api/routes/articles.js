const express = require('express')
const ArticleModel = require("../models/Article")
const UserModel = require('../models/User')
const router = express.Router({
    mergeParams: true
})

router.post('/add', async (req, res) => {
    console.log('---add article---');
    const { title, introduction, content, label, cover_src } = req.body
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const mouth = nowDate.getMonth() + 1;
    const day = nowDate.getDate();
    const create_time = `${year}-${mouth}-${day}`;
    const article = await ArticleModel.create({
        title, introduction, content, label, cover_src, create_time
    })
    return res.send({
        code: 0,
        data: {
            message: "发表成功", article
        }
    });

})

router.get('/list', async (req, res) => {
    console.log('---get all article---');

    const articles = await ArticleModel.find()
    return res.send({
        code: 0,
        data: {
            message: "获取全部文章成功", articles
        }
    });

})


router.get('/detail/:id', async (req, res) => {
    console.log('---get article detail---');
    const id = req.params.id
    const article = await ArticleModel.findById(id)
    // const { title, introduction, content, label, cover_src } = doc
    // const nowDate = new Date();
    // const year = nowDate.getFullYear();
    // const mouth = nowDate.getMonth() + 1;
    // const day = nowDate.getDate();
    // const create_time = `${year}-${mouth}-${day}`;
    // const article = await ArticleModel.create({
    //     title, introduction, content, label, cover_src, create_time
    // })
    return res.send({
        code: 0,
        data: {
            message: "获取文章详情成功", article
        }
    });

})


router.put('/edit/:id', async (req, res) => {
    console.log('---edit one article---');
    const id = req.params.id
    const new_article = req.body
    // console.log('new_article', new_article);
    const article = await ArticleModel.findByIdAndUpdate(id, new_article)

    return res.send({
        code: 0,
        data: {
            message: "修改文章成功", article
        }
    });

})

router.delete('/del/:id', async (req, res) => {
    console.log('---delete one article---');
    const id = req.params.id
    console.log(id);
    const article = await ArticleModel.deleteOne({ _id: id })

    return res.send({
        code: 0,
        data: {
            message: "删除文章成功", article
        }
    });

})

router.put('/visits/:id', async (req, res) => {
    const id = req.params.id
    const doc = await ArticleModel.findById(id)
    const visits_num = doc.visited + 1
    const result = await ArticleModel.update({ _id: id }, {
        $set: {
            visited: visits_num
        }
    })

    return res.send({
        code: 0,
        data: {
            result
        }
    })
})


router.put('/upvote', async (req, res) => {
    const { id, user_id } = req.body
    const doc = await ArticleModel.findById(id)
    let upvote_users = doc.upvote_users
    const user = await UserModel.findById(user_id)
    const userId = user._id
    console.log('用户id', userId);
    if (upvote_users.indexOf(user_id) > -1) {
        console.log('取消点赞');
        upvote_users = upvote_users.filter(item => !String(item).includes(userId)
        )
        console.log('当前点赞的用户', upvote_users);
        await ArticleModel.updateOne({ _id: id }, {
            $set: {
                upvote_users: upvote_users
            }
        })
    } else {
        console.log('点赞');
        upvote_users.push(userId)
        await ArticleModel.updateOne({ _id: id }, {
            $set: {
                upvote_users: upvote_users
            }
        })
    }

    const item = await ArticleModel.findById(id)
    return res.send({
        code: 0,
        data: {
            state: item.upvote_users.indexOf(user_id) > -1
        }
    })
})











router.get('/getlables', async (req, res) => {
    const data = await ArticleModel.find()
    return res.send({ err: 0, message: data });
})

router.post('/getlableInfo', async (req, res) => {
    const { lable } = req.body
    const data = await ArticleModel.find({ lable })
    res.send({ err: 0, data })
})

router.get('/getcategroys', async (req, res) => {
    const data = await ArticleModel.find().sort({ article_categroy: 1 })
    res.send({ err: 0, message: data })
})

router.post('/getManycategroys', async (req, res) => {
    const { categroy } = req.body
    const data = await ArticleModel.find({ article_categroy: categroy })
    return res.send({ err: 0, message: data })
})

router.get('bynotetext/:id', async (req, res) => {
    const path = req.params.id
    await ArticleModel.find({ article_id: path })
})

router.get('/gettimenoteList', async (req, res) => {
    const nowdate = new Date()
    let year = nowdate.getFullYear()
    let month = nowdate.getMonth() + 1
    let target = month - 1
    const day = nowdate.getDate()
    let doc = await ArticleModel.find({ likes: { $lt: `${year}-${target}-${day}`, $gt: `${year}-${month}-${day}` } })
    res.json(doc)
})

router.post('/notelike', async (req, res) => {
    const { likestar, id } = req.body
    await ArticleModel.findByIdAndUpdate(id, { like_Star: likestar })
})










module.exports = router