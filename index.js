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

app.get('/send', (req, res) => {
    const { openid } = req.query // 通过get参数形式指定openid

})

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

app.post('/testpost', async (req, res) => {
    const {openid} = req.query // 通过get参数形式指定openid
    console.log("Got a POST request from /signup path!")

    const data = req.body.title + openid
    let title = req.body.title
    console.log("Corresponding title:", data)

    // const info = await newsletter.signupNotify("openid",
    //     "活动标题",
    //     "address",
    //     "报名人",
    //     "￥1",
    //     "活动备注")
    res.send(data)
})

// 以下部分监听接口
const port = process.env.PORT || 80
app.listen(port, () => {
    console.log('服务启动成功，端口：', port)
})
