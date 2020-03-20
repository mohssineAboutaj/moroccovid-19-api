const express = require('express'),
			cors = require('cors'),
			app = express(),
			bodyParser = require('body-parser'),
			port = process.env.PORT || 2021,
			puppeteer = require('puppeteer'),
			axios = require('axios'),
			scrapeUrl = "http://www.covidmaroc.ma",
			helperApi = "https://corona.lmao.ninja/countries/morocco";

// use some middleware
app.use(cors())
app.use(bodyParser.json())

// init express routing
const router = express.Router();

// define routes
router.get('/', async function(req, res) {
	var data = {
		cases: 0,
		todayCases: 0,
		deaths: 0,
		todayDeaths: 0,
		recovered: 0,
		active: 0,
		critical: 0,
		casesPerOneMillion: 0,
		regions: [],
	};

	// do a request to get into from the url
	const browser = await puppeteer.launch({
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
		],
	});
	const page = await browser.newPage();
	await page.goto(scrapeUrl, {
		waitUntil: 'networkidle2',
	});
	let element = await page.$('table.ms-rteTable-6')
	await page.evaluate(element => {
		element.querySelectorAll('tr').forEach(async function(el) {
			let reg = await el.querySelector('th h2').trim(),
					count = await parseInt(el.querySelector('td h2').trim());
	
			if (reg && count) {
				await data.regions.push({ reg, count })
			}
		})
	}, element);

	await axios.get(helperApi).then(response => {
		const rd = response.data;
		data.cases = rd.cases
		data.todayCases = rd.todayCases
		data.deaths = rd.deaths
		data.todayDeaths = rd.todayDeaths
		data.recovered = rd.recovered
		data.active = rd.active
		data.critical = rd.critical
		data.casesPerOneMillion = rd.casesPerOneMillion
	}).catch(err => {
		console.log(err)
	})

	await res.json(data)

	await browser.close();
})

// use routers
app.use('', router)

// lunch in a host
app.listen(port, () => {
	console.log(`app running on port ${port} `)
})