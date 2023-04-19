const fs = require('fs');
const path = require('path');
const request = require('request');

function download(dir, ...uris) {
    dir = dir || "./download"
    uris.forEach((uri, index) => {
        //TODO:test code
        if (index > 10) return;
        const targetDir = dir + path.dirname(new URL(uri).pathname);
        makeDirIfNeeded(targetDir);
        const file = `${targetDir}/${index}${path.extname(uri)}`;
        fs.exists(file, (exists) => {
            if (!exists) {
                console.log('下载：', uri)
                request({uri: uri})
                    .pipe(fs.createWriteStream(file)
                        .on('error', err => {
                            if (err) {
                                console.log("错误: " + err);
                            }
                        })
                        .on('close', () => {
                            console.log("成功: " + uri);
                        }))
                    .on('error', err => {
                        if (err) {
                            console.log("错误222: " + err);
                        }
                    });
            } else {
                console.log('目标文件已存在：' + file);
            }
        });
    })
}

function makeDirIfNeeded(dir) {
    fs.exists(dir, (exists) => {
        if (!exists) {
            fs.mkdir(dir, {recursive: true}, (err) => {
                if (err) {
                    console.log("创建目录失败：" + err);
                }
            });
        }
    });
}

module.exports = download