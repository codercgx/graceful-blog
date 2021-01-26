var express = require('express');
const app = express()
var router = express.Router();

const UserModel = require('../models/User')
const CaptchaModel = require('../models/Captcha')

const assert = require('http-assert')
const Jwt = require('../utils/jsonwebtoken');
const send = require('../utils/meailSend');


router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const doc = await UserModel.findOne({ username: username }).select('+password')
    assert(doc, 422, '用户不存在')
    console.log(doc);
    const isVaild = require('bcryptjs').compareSync(password, doc.password)
    assert(isVaild, 422, '密码错误')
    const token = Jwt.createToken({ username: username, login: true })
    return res.send({
      code: 0, data: {
        doc, token
      }
    })
  } catch (error) {
    return res.status(422).send({
      message: error.message
    })

  }

})

router.post('/register', async (req, res) => {
  const { username, password, email, captcha } = req.body

  const user = await CaptchaModel.findOne({ username })
  console.log('user', user);
  if (user.captcha == captcha) {
    let doc = await UserModel.create({ username, password, email })
    const token = Jwt.createToken({ id: doc._id, login: true })
    return res.send({
      code: 0, data: {
        user: doc, token
      }
    })

  } else {
    return res.send({
      code: 999, data: {
        message: '验证码错误，请重试'
      }
    })
  }

})


router.post('/emailInfo', async (req, res) => {
  const { username, email } = req.body
  await CaptchaModel.deleteMany({ username })
  let captcha = parseInt(Math.random() * 999999)
  send(email, captcha).then(async v => {
    await CaptchaModel.create({ username, captcha })
    return res.send({
      code: 0, data: {
        captcha, message: '发送验证码成功'
      }
    })
  }).catch(reason => {
    return res.send({ code: -999, message: reason.message })
  })
})


module.exports = router;
