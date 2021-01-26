function send(mail, code) {             // 发送目标 发送的看具体内容
    const nodemailer = require('nodemailer');//导入模块
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',//邮件主机类型可以在lib库中选择
        port: 465,//端口（不同的端口发送不同的邮箱，这里为QQ邮箱）
        secure: true,
        auth: {//作者
            user: '897137683@qq.com', // 发送者
            pass: 'pmazyeguioezbahf' // 发送者的邮箱smtp， 这个可以自行百度就是QQ邮箱的一个密钥
        }
    });
    // 这里写邮件的详情信息
    let obj = {
        from: '"Fred Foo 👻" <897137683@qq.com>', // 发送者
        to: mail, // 接收者
        subject: '您有一条博客注册验证码',
        text: `小主您正在注册我的博客账户,验证码:${code}如不是本人操作请忽略。`, //信息描述
    }
    // 开始发送
    return new Promise((resolve, reject) => {
        transporter.sendMail(obj, (err, res) => {
            if(!err){
                if (res.messageId) {
                    console.log('发送邮箱成功');
                    resolve(res)
                } else {
                    console.log('发送邮箱失败');
                    reject({
                        code: '666',
                        message: '请稍后重新'
                    })
                }
            }else{
                reject({
                    code: '999',
                    message: '请填写合法的邮箱'
                })
            }
        })
    })

}
module.exports = send;