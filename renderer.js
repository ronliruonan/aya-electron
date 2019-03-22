/**
 * Created by RonLi on 03/16/2019
 */
(() => {
    const http = require('http')
    const cheerio = require('cheerio')
    const url = 'http://www.bdfdc.net/loadBuildInfo.jspx?pageIndex=1&projectId=00000586';

    function sb() {
        http.get(url, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                let $ = cheerio.load(data);

                let fragment = document.createDocumentFragment();
                
                $('div.lie_right_center a').each(function (i, e) {
                    console.log($(e).text())
                    let liItem = document.createElement('li')
                    liItem.innerText = $(e).text();
                    fragment.appendChild(liItem);
                })

                let elUl = document.querySelector('#logs');
                let fengexian = document.createElement('li')
                fengexian.innerHTML=`------分割线-------${new Date().toLocaleString()}------`;
                fragment.appendChild(fengexian)
                elUl.appendChild(fragment);
            })
        })
    }

    sb()
    setInterval(() => {
        sb();
        console.log('--------分-----割-----线-----' + new Date().toLocaleString() + '-----')
    }, 1000 * 30);
})();