const express = require('express'),
			cors = require('cors'),
			app = express(),
			bodyParser = require('body-parser'),
			port = process.env.PORT || 2019,
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
		date: "",
		cases: 0,
		Excluded: 0,
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
	}).catch(err => {
		console.log(err)
	})

	await axios.get(scrapeUrl).then(async function(response) {
		let $ = await cheerio.load(response.data)

		// statistics
		data.date = await $('#WebPartWPQ1 table tr').first().text().trim()
		data.Excluded = await $('#WebPartWPQ1 table tr').last().find('td').last().text().trim()

		// regions
		await $('#WebPartWPQ2 table tr').each(async function() {
			let reg = await $(this).find('th').text().toString().trim(),
					count = await $(this).find('td').text().toString().trim();

			// push data into region property
			await data.regions.push({ reg, count })
		});
	}).catch(err => {
		console.log(err)
	})
	
	// remove firt tr (table row) because it's contain the table colums title
	await data.regions.shift()

	// return results as json
	await res.json(data)

})

// use routers
app.use('/', router)

// lunch in a host
app.listen(port, () => {
	console.log(`app running on port ${port} `)
})
