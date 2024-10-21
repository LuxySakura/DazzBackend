const request = require("request");

// 格式化数字为两位数
function formatNumber(num) {
    return num < 10 ? '0' + num : num;
}

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
// 活动名称
// {{thing1.DATA}}
// 活动时间
// {{date5.DATA}}
// 报名人
// {{name4.DATA}}
// 联系电话
// {{phone_number10.DATA}}
// 备注
// {{thing6.DATA}}
module.exports.userSignUpNotify = async function userSignUpNotify(_openid, _title, _session, _name, _phone, _num, _price) {
    const _memo = _num + "张 ￥" + _price + "元档位"

    // 解析日期
    const date = new Date(_session.replace(/(\d{2})\/(\d{2})\/(\d{2})/, '20$1-$2-$3'));

    // 获取年、月、日、时、分
    const year = date.getFullYear();
    let month = formatNumber(date.getMonth() + 1); // 月份是从0开始的
    let day = formatNumber(date.getDate());
    const hours = formatNumber(date.getHours());
    const minutes = formatNumber(date.getMinutes());

    // 拼接新的日期字符串
    const _newDateString = year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes;

    // console.log(newDateString); // 输出: 2024年10月11日 14:00
    // console.log("User Memo:", _memo)

    return new Promise((resolve, reject) => {
        request({
            url: "http://api.weixin.qq.com/cgi-bin/message/subscribe/send",
            method: "POST",
            body: JSON.stringify({
                touser: openid,
                template_id: "9yw7EnH6QiGJ1KGp7mrplU8T6QG__ErA7CUciFAbeiA",
                miniprogram_state: "developer",
                data: {
                    // 按照key前面的类型，对照参数限制填写，否则都会发送不成功
                    //活动名称
                    thing1: {
                        value: _title
                    },
                    //场次时间
                    date5: {
                        value: _session
                    },
                    //报名人姓名
                    name4: {
                        value: _name
                    },
                    //报名人联系方式
                    phone_number10: {
                        value: _phone
                    },
                    //温馨提示
                    thing6: {
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


// 抽奖开奖的通知订阅消息
