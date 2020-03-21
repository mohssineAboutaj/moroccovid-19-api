const express = require('express'),
			cors = require('cors'),
			app = express(),
			bodyParser = require('body-parser'),
			port = process.env.PORT || 2020,
			cheerio = require('cheerio'),
			axios = require('axios'),
			helperApi = "https://corona.lmao.ninja/countries/morocco",
			scrapeUrl = "http://www.covidmaroc.ma";

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

	await axios.get(helperApi).then(async function(response) {
		const rd = response.data;
		data.cases = await rd.cases
		data.todayCases = await rd.todayCases
		data.deaths = await rd.deaths
		data.todayDeaths = await rd.todayDeaths
		data.recovered = await rd.recovered
		data.active = await rd.active
		data.critical = await rd.critical
		data.casesPerOneMillion = await rd.casesPerOneMillion
	}).then(async function() {
		await axios.get(scrapeUrl).then(async function(response) {
			let $ = await cheerio.load(response.data)
			await $('table tr').each(async function() {
				let reg = await $(this).find('th').text().trim(),
						count = await parseInt($(this).find('td').text().trim());
		
				if (reg && count) {
					await data.regions.push({ reg, count })
				}
			});
		}).then(async function() {
			await res.json(data)
		}).catch(err => {
			console.log(err)
		})
	}).catch(err => {
		console.log(err)
	})

})

// use routers
app.use('', router)

// lunch in a host
app.listen(port, () => {
	console.log(`app running on port ${port} `)
})
