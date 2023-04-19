require('./fetch_douban_top_film').start();
// require('./fetch_rss').fetch("https://rsshub.app/douban/movie/playing");
// require('./fetch_rss').fetch("http://www.zhihu.com/rss");
// require('./fetch_rss').parse("./file/playing.xml");

// require('./my_puppeteer');
// https://nextfe.com/rss.xml

// 腾讯视频-你是我的荣耀-第一集：https://v.qq.com/x/cover/mzc00200xh9313v/u0039mpr149.html
// 爱奇艺-原来我很爱你-第十二集：https://www.iqiyi.com/v_1gusgziy5hw.html?vfrm=pcw_home&vfrmblk=&vfrmrst=709181_%E4%BC%9A%E5%91%98%E7%89%B9%E6%9D%83_%E5%A4%A7%E5%89%A7%E6%8A%A2%E5%85%88%E7%9C%8B_video_play6#curid=5461646445734200_3d51a002bdcfbaa0572830300284f46c


//https://tengxingo.com/20210727/qaZd2HWe/index.m3u8
//https://tengxingo.com/20210727/qaZd2HWe/2000kb/hls/index.m3u8
//https://tengxingo.com/VMDIR4CAA791091D21D23E63637080226F370/20210727/qaZd2HWe/2000kb/hls/LC6y1Q6r.ts
//https://tengxingo.com/VMDIR4CAA791091D21D23E63637080226F370/20210727/qaZd2HWe/2000kb/hls/V4QUSYO4.ts
//https://www.hxzxb.com/tools/vip/
// require('fluent-ffmpeg')

// https://jinkuangkj.com:65/20210727/5tV2AQMQ/index.m3u8
// const url = "https://tengxingo.com/20210727/qaZd2HWe/index.m3u8";
// const ts1 = "https://tengxingo.com/VMDIR4CAA791091D21D23E63637080226F370/20210727/qaZd2HWe/2000kb/hls/LC6y1Q6r.ts";
// const ts2 = "https://tengxingo.com/VMDIR4CAA791091D21D23E63637080226F370/20210727/qaZd2HWe/2000kb/hls/V4QUSYO4.ts";
// const file = "./download";
// const download = require('./download');
// // download(file, ts1, ts2);
// // require('./download').start("https://tengxingo.com/20210727/qaZd2HWe/2000kb/hls/index.m3u8")
// const parser = require('./m3u8_parser');
// const utils = require('./util/Utils')
// const scrapyUrl = require('./scrapy_video_url');
//
// const url = 'https://www.iqiyi.com/v_1gusgziy5hw.html?vfrm=pcw_home&vfrmblk=&vfrmrst=709181_%E4%BC%9A%E5%91%98%E7%89%B9%E6%9D%83_%E5%A4%A7%E5%89%A7%E6%8A%A2%E5%85%88%E7%9C%8B_video_play6#curid=5461646445734200_3d51a002bdcfbaa0572830300284f46c';
//
// // go(url);
// go('https://v.88zy.site/20210806/QsCjCEcJ/index.m3u8');
//
// async function go(videoUrl) {
//     console.log('start paring...', videoUrl)
//     // const url = await scrapyUrl(videoUrl)
//     const url = videoUrl;
//     console.log(url)
//     parser.parse(url, (err, result) => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(result);
//             if (result.m3u8) {
//                 go(utils.last(result.list));
//             } else {
//                 download(file, ...result.list);
//             }
//         }
//     })
// }
// require('./test')
// require('./tts_node')
// require('./iat-ws-node')
// require('./exec_command')
