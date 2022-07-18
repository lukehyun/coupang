import fetch from "node-fetch";
import cheerio from 'cheerio';
import express from 'express';

let data={};
let page=1;
let times=1;
//const delay=10*1000*1000;
const delay=5*1000;

async function getdata() {
	let url=`https://www.coupang.com/np/categories/393760?listSize=120&brand=&offerCondition=&filterType=&isPriceRange=false&minPrice=&maxPrice=&page=${page}&channel=user&fromComponent=N&selectedPlpKeepFilter=&sorter=salePriceAsc&filter=&rating=0`
	let r=await fetch(url, {
	  "headers": {
		"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		"accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6",
		"sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
		"sec-ch-ua-mobile": "?0",
		"sec-ch-ua-platform": "\"Windows\"",
		"sec-fetch-dest": "document",
		"sec-fetch-mode": "navigate",
		"sec-fetch-site": "same-origin",
		"sec-fetch-user": "?1",
		"upgrade-insecure-requests": "1",
		"Referer": "https://www.coupang.com/",
		"Referrer-Policy": "strict-origin-when-cross-origin"
	  },
	  "body": null,
	  "method": "GET"
	});
	let restext=await r.text();
	let $ = cheerio.load(restext);
	

	let names=[];
	for (let tag of $('.name'))
	{
		names.push($(tag).text().trim());
	}
	
	let prices=[];
	for (let tag of $('.price-value'))
	{
		prices.push(Number($(tag).text().replaceAll(',','')));
	}

	let links=[];
	for (let tag of $('.baby-product-link'))
	{
		links.push($(tag).attr('href'));
	}

	//merge data
	for(let i=0;i<names.length;i++)
	{
		data[names[i]]={'name':names[i],'price':prices[i],'link':links[i],'times':times};
	}
	
	//reset page, remove old data
	page+=1;
	if (page==10)
	{
		page=1;
		times+=1;
		for (let name in data)
		{
			if (Math.abs(data[name]['times']-times)>2)
			{
				delete data[name];
			}
		}
	}

	setTimeout(getdata,delay);
};getdata();



let app = express();
let server = app.listen(80,'0.0.0.0')
app.get('/', function(req, res){
	let text=''
	for (let name in data)
	{
		text+=JSON.stringify(data[name])+'<br>';
	}
    res.send(text);
});