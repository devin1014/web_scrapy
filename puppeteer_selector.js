const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 800,
        height: 600
    });
    await page.goto('https://www.baidu.com/');
    await page.screenshot({
        path: './image/example.png',
        fullPage: true
    });

    await browser.close();
})();

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://music.163.com/#');
    const musicName = '鬼才会想起';
    await page.type('.txt.j-flag', musicName, {delay: 0});

    await page.keyboard.press('Enter');

    await page.waitFor(2000);
    let iframe = await page.frames().find(f => f.name() === 'contentFrame');
    const SONG_LS_SELECTOR = await iframe.$('.srchsongst');

    const selectedSongHref = await iframe.evaluate(e => {
        const songList = Array.from(e.childNodes);
        const idx = songList.findIndex(v => v.childNodes[1].innerText.replace(/\sg/g, '') === '鬼才会想起');
        return songList[idx].childNodes[1].firstChild.firstChild.firstChild.href;
    }, SONG_LS_SELECTOR);

    await page.goto(selectedSongHref);

    await page.waitFor(2000);
    iframe = await page.frames().find(f => f.name() === 'contentFrame');

    const unfoldButton = await iframe.$('#flag_ctrl');
    unfoldButton.click();

    const LYRIC_SELECTOR = await iframe.$('#lyric-content')
    const lyricCtn = await iframe.evaluate(e => {
        return e.innerText;
    }, LYRIC_SELECTOR);

    console.log(lyricCtn);

    await page.screenshot({
        path: './image/music.png',
        fullPage: true
    });

    let writerStream = fs.createWriteStream('music.txt');
    writerStream.write(lyricCtn, 'UTF8');
    writerStream.end();

    const commentCount = await iframe.$eval('.sub.s-fc3', e => e.innerText);
    console.log(commentCount);

    const commentList = await iframe.$$eval('.itm', elements => {
        const ctn = elements.map(v => {
            return v.innerText.replace(/\s/g, '');
        });
        return ctn;
    });
    console.log(commentList);
})();

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.guazi.com/hz/buy/');

    let title = await page.title();
    console.log(title);

    const BRANDS_INFO_SELECTOR = '.dd-all.clearfix.js-brand.js-option-hid-info';
    const brands = await page.evaluate(sel => {
        const ulList = Array.from($(sel).find('ul li p a'));
        const ctn = ulList.map(v => {
            return v.innerText.replace(/\s/g, '');
        });
        return ctn;
    }, BRANDS_INFO_SELECTOR);

    console.log('汽车品牌', JSON.stringify(brands));

    let writeStream = fs.createWriteStream('./file/car_brands.json');
    writeStream.write(JSON.stringify(brands, undefined, 2), 'UTF8');
    writeStream.end();

    const CAR_LIST_SELECTOR = 'ul.carlist';
    const carList = await page.evaluate((sel) => {
        const catBoxs = Array.from($(sel).find('li a'));
        const ctn = catBoxs.map(v => {
            const title = $(v).find('h2.t').text();
            const subTitle = $(v).find('div.t-i').text().split('|');
            return {
                title: title,
                year: subTitle[0],
                milemeter: subTitle[1]
            };
        });
        return ctn;
    }, CAR_LIST_SELECTOR);

    console.log(`总共${carList.length}辆汽车数据: `, JSON.stringify(carList, undefined, 2));

    writeStream = fs.createWriteStream('./file/car_info.json');
    writeStream.write(JSON.stringify(carList, undefined, 2), 'UTF8');
    writeStream.end();

    browser.close();
})();