const request = require('request');
const fs = require('fs');
const JSEncrypt2 = require('./jsencrypt');
const readline = require('readline');

const url = 'http://ysf.fangdi.com.cn:6001/SHFirstHouse/OuterLogin.jsp';
const getVerifyUrl = 'http://ysf.fangdi.com.cn:6001/SHFirstHouse/login/getVerify.action';
const loginUrl = 'http://ysf.fangdi.com.cn:6001/SHFirstHouse/login/OuterLogin.action';
const cookieFile = __dirname + '/cookie.txt';
const verifyFile = __dirname + '/verify.jpg';
const userAgent = 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36';
const userName = '101907_666'
const password = 'nokia021'
let cookie = ''

start();

async function start() {
    if (fs.existsSync(verifyFile)) fs.rmSync(verifyFile);
    cookie = fs.readFileSync(cookieFile);
    if (cookie) {
        cookie = cookie.toString()
    }
    request({
        url: url,
        method: 'GET',
        headers: {
            'Cookie': cookie
        }
    }, null, (err, response, body) => {
        console.log('>>>request', 'url', url)
        console.log('>>>request', 'cookie', cookie.split(','));
        const _cookie = response.headers['set-cookie'].toString()
        console.log('<<<response', 'code', response.statusCode)
        console.log('<<<response', 'cookie', _cookie.split(','))

        fs.writeFileSync(cookieFile, _cookie);
        getVerifyImage(getVerifyUrl);

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('请输入4位验证码:\n', (answer) => {
            console.log('userName', encryptPassword(userName));
            console.log('password', encryptPassword(password));
            login(loginUrl, encryptPassword(userName), encryptPassword(password), answer);
            rl.close();
        });
    });
}

async function getVerifyImage(url) {
    console.log('请求验证码...')
    const option = {
        url: url,
        method: 'GET',
        headers: {
            'Cookie': cookie
        }
    };
    const imageStream = fs.createWriteStream(verifyFile);
    request(option)
        .pipe(imageStream)
        .on('end', () => {
        })
        .on('finish', () => {
            imageStream.end();
            console.log('验证码已下载')
        })
        .on('error', (err) => {
            console.log(err);
            console.error(err);
        })
}

function encryptPassword(password) {
    var publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCQVosAmSJ9Q6AyY7pObG2Ew34NcUgBzt+7Q4XSAeyuFw8r5HyuV+hcpniCFMmWwEn7k1LgnkC+ymPBV73gIBl5CMIxo7+wU4FtEsbAD0I68I5ZyWLi6cImj5tkWa2ON8Gp250zgMGBBs5KX2cX6MwiGauZtNkXAXqOQtXq7unNNQIDAQAB";
    var encrypt = new JSEncrypt2.JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(password);
}

function login(url, userName, password, verifyCode) {
    const body = `loginName=${userName}&password=${password}&check_input=${verifyCode}`;
    request({
        url: url,
        method: 'POST',
        headers: {
            'Cookie': cookie
        },
        body: body
    }, (err, res, body) => {
        if (err) {
            console.error(err);
        } else {
            console.log(body);
        }
    });
}
