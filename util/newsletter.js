const request = require("request");

// 发送用户报名成功时候的通知订阅消息
module.exports.signupNotify = async function signupSuccessNotify(_openid, _title, _address, _name, _amount, _memo) {
    console.log("Processing...")
    return new Promise((resolve, reject) => {
        request({
            url: "http://api.weixin.qq.com/cgi-bin/message/subscribe/send",
            method: "POST",
            body: JSON.stringify({
                touser: _openid,
                template_id: "nJRikwbUcAe12oBPt5fJoxHmRKDZu6_WxCT2uUSF9rs",
                data: {
                    // 这里替换成自己的模板ID的详细事项，不要擅自添加或更改
                    // 按照key前面的类型，对照参数限制填写，否则都会发送不成功
                    // 活动名称
                    thing2: {
                        value: _title
                    },
                    // 地址
                    thing5: {
                        value: _address
                    },
                    // 报名人
                    thing23: {
                        value: _name
                    },
                    // 费用合计
                    amount18: {
                        value: _amount
                    },
                    // 备注
                    thing19: {
                        value: _memo
                    },
                },
            }),
        },function(error,res){
            if(error) reject(error)
            resolve(res.body)
        });
    });
};

// 活动开始前的通知订阅消息
module.exports.eventStartNotify = async function eventStartNotify(newsletter) {
    return new Promise((resolve, reject) => {
        request({
            url: "http://api.weixin.qq.com/cgi-bin/message/subscribe/send",
            method: "POST",
            body: JSON.stringify({
                touser: openid,
                template_id: "jpqYOzYeGO28PzAwO-4LZaTKylUEnSj-0_1tvKeGAAQ",
                miniprogram_state: "developer",
                data: {
                    // 这里替换成自己的模板ID的详细事项，不要擅自添加或更改
                    // 按照key前面的类型，对照参数限制填写，否则都会发送不成功
                    //活动名称
                    thing4: {
                        value: "活动名称"
                    },
                    //开始时间
                    date3: {
                        value: new Date()
                    },
                    //活动地点
                    thing6: {
                        value: "活动地点"
                    },
                    //距离开始时间
                    character_string17: {
                        value: "距离开始时间"
                    },
                    //温馨提示
                    thing7: {
                        value: "温馨提示"
                    },
                },
            }),
        },function(error,res){
            if(error) reject(error)
            resolve(res.body)
        });
    });
};

// 创建的活动有人报名的通知订阅消息
// 抽奖开奖的通知订阅消息