const express = require('express'),
			cors = require('cors'),
			app = express(),
			bodyParser = require('body-parser'),
			port = process.env.PORT || 2021,
			cheerio = require('cheerio'),
			request = require('request'),
			axios = require('axios'),
			scrapeUrl = "http://www.covidmaroc.ma",
			helperApi = "https://corona.lmao.ninja/countries/morocco";

// use some middleware
app.use(cors())
app.use(bodyParser.json())

// init express routing
const router = express.Router();

// define routes
router.get('/', (req, res) => {
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
	request(scrapeUrl, async function(requestReq, responseRes, body) {
		let $ = cheerio.load(body);

		// data.regions = 
		await $('table.ms-rteTable-6 tr').each(async function() {
			let reg = await $(this).find('th').text().trim(),
					count = await parseInt($(this).find('td').text().trim());

			if (reg && count) {
				await data.regions.push({ reg, count })
			}
		});

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

	})
})

// use routers
app.use('', router)

// lunch in a host
app.listen(port, () => {
	console.log(`app running on port ${port} `)
})
