const request = require('request');
const http = require('http');
const fs = require('fs');
const xmlReader = require('xmlreader');

function fetch(url) {
    console.log('request: ' + url);
    request(url, function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            console.log('response:\n' + body);
        }
    });
    // console.log("request: " + url);
    // http.get(url, function (res) {
    //     let data;
    //     res.on('data', function (chunk) {
    //         data += chunk;
    //         console.log(data);
    //     });
    //     res.on('end', function () {
    //         console.log(data);
    //     });
    // });
}

function parse(path) {
    fs.readFile(path, (err, data) => {
        xmlReader.read(data.toString(), (err, res) => {
            console.log(res);
            res.rss.channel.item.array.forEach((value, index, array) => {
                console.log(index, value.title.text());
            })
        });
    });
}

exports.fetch = fetch
exports.parse = parse