const puppeteer = require('puppeteer');

function listenerPage(page) {
    page
        .on('load', () => {
            console.log('load', page.url());
        })
        .on('dialog', async dialog => {
            console.log('dialog', dialog.message());
            try {
                await dialog.accept();
            } catch (e) {
                console.error(e);
            }
        })
        .on('error', () => {
            console.log('error');
        })
}

async function findHtmlInfo(page) {
    console.log('\n');
    console.log('page.title', await page.title());
    console.log('head innerHtml', await page.evaluate(() => document.head.innerHTML));
}

async function findElement(page) {
    console.log('\n');
    const jiekouType = await page.$('#jiekouType'); //#id
    await jiekouType.screenshot({
        path: './image/jiekouType.png'
    });

    const list = await page.$$('div ul li a');
    console.log('div ul li a, length=', list.length);
}

async function findElementValue(page) {
    console.log('\n');
//            <select class="mobliecss vipinput" id="jiekouType">
//                 <option value="https://z1.m1907.cn/?jx=">👍 推荐接口1</option>
//                 <option value="https://jqaaa.com/jx.php?url=">推荐接口2</option>
//             </select>
    let selector = '#jiekouType'
    await log(page, selector, 'innerHtml', ele => ele.innerHTML);
    await log(page, selector, 'innerText', ele => ele.innerText);

    console.log('\n');

    //<button id="playbtn" class="mobliecss" title="点我免费播放VIP视频">免费播放</button>
    selector = '#playbtn'
    await log(page, selector, 'id', ele => ele.id);
    await log(page, selector, 'class', ele => ele.class); //undefined
    await log(page, selector, 'title', ele => ele.title);
    await log(page, selector, 'innerHtml', ele => ele.innerHTML);
    await log(page, selector, 'innerText', ele => ele.innerText);

    await log(page, selector, 'getAttribute(\'id\')', ele => ele.getAttribute('id'));
    await log(page, selector, 'getAttribute(\'class\')', ele => ele.getAttribute('class'));
    await log(page, selector, 'getAttribute(\'title\')', ele => ele.getAttribute('title'));

    // find all a[href]
    console.log('[href]', await page.$$eval('[href]', (href) => href.map(e => e.href)));
    // console.log('a[href]', await page.$$eval('a[href]', (href) => href.map(e => e.href)));
    // console.log('div ul li a[href]', await page.$$eval('div ul li a[href]', (href) => href.map(e => e.title)));

    //.play-list下所有ul li a列表
    const list = await ((await page.$('.play-list')).$$eval('div ul li a[href]', (href) => href.map(e => e.title)));
    console.log(list)
}

async function setValue(page) {
    await page.type('#video-url', "http://test.com");
    await page.select('select#jiekouType', 'https://jqaaa.com/jx.php?url=');
    await page.screenshot({
        path: './image/input.png',
    });

}

async function log(page, selector, elementValue, fn) {
    console.log(selector, elementValue, await page.$eval(selector, fn));
}

module.exports = (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    listenerPage(page);
    await page.goto("file://" + __dirname + "/html/vip_video_parse_no_script.html");
    // await page.screenshot({
    //     path: './image/example.png',
    //     fullPage: true
    // });
    await findHtmlInfo(page);

    await findElement(page);

    await findElementValue(page);

    await setValue(page);

    await browser.close();
})();
