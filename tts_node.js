/* Created by way on 2020/06/28.
 *
 * 运行前：请先填写 appid、apiSecret、apiKey
 *
 * 本实例在续费提供的demo上进行，实现了文本文件的批量合成
 *
 *
 * 在线语音合成 WebAPI 接口调用示例 接口文档（必看）：https://www.xfyun.cn/doc/tts/online_tts/API.html
 * 错误码链接：
 * https://www.xfyun.cn/document/error-code （code返回错误码时必看）
 *
 */
const CryptoJS = require('crypto-js')
const WebSocket = require('ws')
var log = require('log4node')
var fs = require('fs')
var readline = require('readline')

// 存放文本数据
let textList = []
// 计数
let count = 0
// 标记转换成功或者失败
let success = false

// 系统配置
const config = {
    // 请求地址
    hostUrl: "wss://tts-api.xfyun.cn/v2/tts",
    host: "tts-api.xfyun.cn",
    //在控制台-我的应用-在线语音合成（流式版）获取
    appid: "3aa32daf",
    //在控制台-我的应用-在线语音合成（流式版）获取
    apiSecret: "ZGE1MzJkY2ZmNmM2ZWM0YmZiNzEwZDRh",
    //在控制台-我的应用-在线语音合成（流式版）获取
    apiKey: "9facebf8a584890411eff626b66f17de",
    uri: "/v2/tts",
}

/**
 * @description: 将文本信息批量转换为语音文件
 * @return:
 */
function textToSpeech() {

    // 按行读取脚本文件中到内容
    readFileToArr('./file/script.txt', (data) => {
        textList = data
    })

    // 获取当前时间 RFC1123格式
    let date = (new Date().toUTCString())
    // 设置当前临时状态为初始化
    let wssUrl = config.hostUrl + "?authorization=" + getAuthStr(date) + "&date=" + date + "&host=" + config.host
    let ws = new WebSocket(wssUrl)

    // 连接建立完毕，读取数据进行识别
    ws.on('open', () => {
        log.info("连接已建立!")
        // 发送文本请求合成
        send(textList[count])
    })

    // 得到结果后进行处理，仅供参考，具体业务具体对待
    ws.on('message', (data, err) => {
        if (err) {
            log.error('message error: ' + err)
            return
        }

        let res = JSON.parse(data)
        if (res.code !== 0) {
            log.error(`${res.code}: ${res.message}`)
            success = false
            ws.close()
            return
        }
        // 将返回内容写入音频文件
        let audio = res.data.audio
        let audioBuf = Buffer.from(audio, 'base64')
        save(res.sid, audioBuf)

        // 完成
        if (res.code === 0 && res.data.status === 2) {
            success = true
            ws.close()
        }
    })

    // 资源释放
    ws.on('close', () => {
        log.info('连接已关闭!')
        if (success) {
            log.info(`第${count + 1}条文字合成完成！`)
            count++
            if (count < textList.length) {
                //执行下一条任务
                textToSpeech()
            } else {
                log.info('合成任务完成！')
            }
        }
    })

    // 连接错误
    ws.on('error', (err) => {
        log.error("websocket connect err: " + err)
    })

    // 鉴权签名
    function getAuthStr(date) {
        let signatureOrigin = `host: ${config.host}\ndate: ${date}\nGET ${config.uri} HTTP/1.1`
        let signatureSha = CryptoJS.HmacSHA256(signatureOrigin, config.apiSecret)
        let signature = CryptoJS.enc.Base64.stringify(signatureSha)
        let authorizationOrigin = `api_key="${config.apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`
        return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(authorizationOrigin))
    }

    // 传输数据
    function send(text) {
        let frame = {
            // 填充common
            "common": {
                "app_id": config.appid
            },
            // 填充business
            "business": {
                "aue": "lame",
                "sfl": 1,
                "auf": "audio/L16;rate=16000",
                "vcn": "xiaoyan",
                "tte": "UTF8",
                "speed": 50
            },
            // 填充data
            "data": {
                "text": Buffer.from(text).toString('base64'),
                "status": 2
            }
        }
        ws.send(JSON.stringify(frame))
    }

    // 将文件保存在output目录
    function save(name, data) {
        fs.writeFile(`./output/${name}.mp3`, data, {flag: 'a'}, (err) => {
            if (err) {
                log.error('save error: ' + err)
                return
            }
            log.info(`第${count + 1}条合成语音写入中……`)
        })
    }
}

/*
* 按行读取文件内容
* 返回：字符串数组
* 参数：fReadName:文件名路径
*      callback:回调函数
* */
function readFileToArr(fReadName, callback) {
    var fRead = fs.createReadStream(fReadName);
    var objReadline = readline.createInterface({
        input: fRead
    });
    var arr = [];
    objReadline.on('line', function (line) {
        arr.push(line);
    });
    objReadline.on('close', function () {
        callback(arr);
    });
}

// 执行方法
textToSpeech()
