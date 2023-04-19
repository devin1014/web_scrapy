const cheerio = require('cheerio');
const fs = require('fs');

fs.readFile('./html/t1.html', (err, html) => {
    if (err) {
        console.error(err);
    } else {
        const $ = cheerio.load(html.toString('utf8'));
        $('table.default_tableCss').find('tr').each((i, ele) => {
            const selector = i === 0 ? 'th' : 'td';
            const data = [];
            $(ele).find(selector).each((_i, _ele) => {
                const th = $(_ele).text();
                if (th.length > 0) {
                    data.push(th);
                }
            })
            console.log(data.toString());
        })
        // $('td').each(function (i, el) {
        //     console.log($(this).text().trim())
        // })
    }
});

