const cheerio = require('cheerio'),
			request = require('request'),
			writeJson = require('write-json'),
			scrapeUrl = "http://www.covidmaroc.ma";

var data = [];

request(scrapeUrl, function(requestReq, responseRes, body) {
	let $ = cheerio.load(body);

	// data.regions = 
	$('table tr').each(async function() {
		let reg = $(this).find('th').text().trim(),
				count = parseInt($(this).find('td').text().trim());

		if (reg && count) {
			data.push({ reg, count })
			writeJson('./regions.json', data)
		}
	});
})
