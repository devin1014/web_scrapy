const fs = require('fs');
const request = require('request');

function parse(url, callback) {
    request(url, (err, res, body) => {
        if (err) {
            callback(err);
        } else {
            const data = parseData(url, body.toString());
            callback(null, data);
        }
    })
}

function parseFile(url, path) {
    const data = fs.readFileSync(path, "utf-8")
    return parseData(url, data);
}

function parseData(url, data, callback) {

    function filter(data, filter) {
        return data.filter((item) => {
            return item.match(filter);
        });
    }

    function convert(item, index) {
        const oldUri = new URL(url);
        oldUri.pathname = item;
        return oldUri.toString();
    }

    const callbackFn = callback || url ? convert : ((item, index) => item);
    const obj = {};
    obj.list = [];
    obj.m3u8 = obj.ts = false
    const lines = data.split("\n");
    let list = filter(lines, /\.m3u8/).map(callbackFn);
    if (list.length > 0) {
        obj.list = list;
        obj.m3u8 = true
    } else {
        list = filter(lines, /\.ts/).map(callbackFn);
        obj.list = list;
        obj.ts = true;
    }


    return obj;
}

module.exports = {parse, parseFile, parseData}