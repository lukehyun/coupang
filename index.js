import fetch from "node-fetch";
import cheerio from 'cheerio';


async function getdata() {
	let r=await fetch("https://www.coupang.com/np/categories/393760?page=2", {
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
		"Referer": "https://www.coupang.com/np/categories/393760",
		"Referrer-Policy": "strict-origin-when-cross-origin"
	  },
	  "body": null,
	  "method": "GET"
	});

	let $ = cheerio.load(await r.text());
	for (let name of $('.name'))
	{
		console.log($(name).text())
	}
}

getdata()