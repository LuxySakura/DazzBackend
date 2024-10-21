const newsletter = require('./util/newsletter')
const express = require('express')
const app = express()

app.use(express.json())

// 以下部分处理各种http请求
app.get('/', (req, res) => {
    const { openid } = req.query // 通过get参数形式指定openid
    console.log("Request Content:", req.query)
    res.send('欢迎使用微信云托管！')
})

// 用户报名后进行“报名成功”订阅消息的发送
app.post('/signup', async (req, res) => {
    const data = req.body
    console.log("Got a POST request from /signup path!", data)

    const info = await newsletter.signupNotify(
        data.openid,
        data.title,
        data.address,
        data.name,
        data.amount,
        data.memo)
    res.send(info)
})

app.post('/userSignUp', async (req, res) => {
    const data = req.body
    console.log("Got a POST request from /userSignUp path!", data)
    const info = await newsletter.userSignUpNotify(
        data.openid,
        data.title,
        data.session,
        data.name,
        data.phone,
        data.num,
        data.price
    )
    res.send(info)
})

// 以下部分监听接口
const port = process.env.PORT || 80
app.listen(port, () => {
    console.log('服务启动成功，端口：', port)
})
