// const fs = require('fs');
const tesseract = require('./util/tesseract');
const gm = require('gm');

async function processImage(imagePath, newPath, thresholdVal) {
    return new Promise(((resolve, reject) => {
        gm(imagePath)
            .threshold(thresholdVal || 55, '%')
            .write(newPath, (err) => {
                if (err) return reject(err);
                resolve(newPath);
            })
    }));
}

async function recognizer(imagePath, options) {
    return new Promise(((resolve, reject) => {
        tesseract
            .process(imagePath, options, (err, text) => {
                if (err) return reject(err);
                resolve(text.replace(/[\r\n\s]/gm, ''));
            });
    }));
}

const img = 'getVerify_1';
const sourcePath = __dirname + '/image/getVerify_1.jpeg';
const targetPath = __dirname + '/image/getVerify_1_ocr.jpeg'

async function process() {
    await processImage(sourcePath, targetPath,40)
    recognizer(targetPath, {
        l: 'eng',
        psm: 7,
        binary: '/usr/local/bin/tesseract'
    })
        .then(text => {
            console.log('result', text)
        })
        .catch((err) => {
            console.error(err);
        });
}

process();

