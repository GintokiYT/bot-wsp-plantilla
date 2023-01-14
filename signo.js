const request = require('request-promise');
const cheerio = require('cheerio');

async function init(signo) {
    try {
        const $ = await request({
            uri: 'https://www.lanacion.com.ar/horoscopo',
            transform: body => cheerio.load(body)
        });

        const websiteTitle = $(`main article div.listaSignos article.--${signo} div.listaSignos__item__descrip p`);
        console.log('Title: ', websiteTitle.text().trim());
      
    } catch (e) {
        console.log(e);
    }
}

init("escorpio");