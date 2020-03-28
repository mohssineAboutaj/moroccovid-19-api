const express = require('express'),
			cors = require('cors'),
			app = express(),
			bodyParser = require('body-parser'),
			port = process.env.PORT || 2019,
			cheerio = require('cheerio'),
			axios = require('axios'),
			helperApi = "https://corona.lmao.ninja/countries/morocco",
			scrapeUrl = "http://www.covidmaroc.ma";

// custom function to remove hex value
function removeHex(val) {
	const regExpToRemoveHex = /(\&.*?\;)/gi;
	return val.replace(regExpToRemoveHex, '').trim()
}

// use some middleware
app.use(cors())
app.use(bodyParser.json())

// init express routing
const router = express.Router();

// define routes
router.get('/', async function(req, res) {
	var data = {
		response: {
			status: 200,
			statusText: "success",
		},
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

		// get published date
		let pubDate = await $('#WebPartWPQ1 table tr').first().find('font').html().toString().trim()
		// sanitize date string
		pubDate = removeHex(pubDate).trim()

		// statistics
		data.date = pubDate
		data.Excluded = await $('#WebPartWPQ1 table tr').last().find('td').last().text().trim()

		// regions
		await $('#WebPartWPQ2 table tr').each(async function() {
			if ($(this).hasClass('ms-rteTableOddRow-6') || $(this).hasClass('ms-rteTableEvenRow-6')) {
				let reg = await $(this).find('th h2').html().toString().trim(),
						count = await $(this).find('td h2').html().toString().trim();

				// replace a hex value that was give an error in the output
				reg = removeHex(reg)
				// convert to string
				reg = reg.toString()

				// replace a hex value that was give an error in the output
				count = removeHex(count)
				// convert count to number
				count = parseInt(count)

				// push data into region property
				if (reg && count) {
					await data.regions.push({ reg, count })
				}
			}
		});
	}).catch(err => {
		console.log(err)
		// set status code
		data.response.status = err.response.status
		data.response.statusText = err.response.statusText
	})


	// return results as json
	await res.json(data)

})

// use routers
app.use('/', router)

// lunch in a host
app.listen(port, () => {
	console.log(`app running on port ${port} `)
})
