const puppeteer = require('puppeteer');

//https://z1.m1907.cn/api/v/?z=3ce9fd29ae903eedd5c05c128a206681&jx=https://v.qq.com/x/cover/mzc00200xh9313v/u0039mpr149.html&s1ig=11401&g=v.88zy.,vod.bun,n1.szja,vod8.we,sod.bun
// blob:https://z1.m1907.cn/3a505b13-be7c-49c5-ac27-75a2cafaca40
// https://juejin.cn/post/6844903880774385671

// async function getVideoUrlByHxzxb(url) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://www.hxzxb.com/tools/vip/');
//
//     await (await page.$('#video-url')).type(url)
//     await page.screenshot({
//         path: './image/test2.png',
//         fullPage: true
//     });
//
//     (await page.$('#playbtn')).click()
//     await page.waitFor(2000);
//     await page.screenshot({
//         path: './image/test3.png',
//         fullPage: true
//     });
//     await page.waitFor(2000);
//     let iframe = await page.$eval('iframe', node => node.getAttribute('src'))
//     console.log(iframe);
//     iframe = await page.$eval('video', node => node.getAttribute('src'))
//     // let videoFrame = await page.frames().find(f => f.name() === 'play-iframe');
//     // const src = await videoFrame.$('video').getAttribute('src')
//     console.log(iframe);
//     // const videoSrc = await iframe.videoFrame('video.s-video[src]', videos => videos.map(video => video.getAttribute('src')));
//     // console.log(videoSrc);
//
//     browser.close();
// }

// module.exports = getVideoUrlByHxzxb('https://v.qq.com/x/cover/mzc00200xh9313v/u0039mpr149.html').catch(err => {
//     console.error(err);
// })

async function getVideoUrlBy_z1(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://z1.m1907.cn/?jx=${url}`, {
        waitUntil: "networkidle0"
    });
    // await page.waitForSelector('a[href="#/upload"]');
    return await page.$eval('video', node => node.getAttribute('src'));
}

module.exports = getVideoUrlBy_z1
