// import dependencies
const express = require("express");
const cors = require("cors");
const { get } = require("axios");

// variables
const baseURL = "https://disease.sh/v3/covid-19/";
const covidURL = baseURL + "countries/morocco";
const vaccineURL = baseURL + "vaccine/coverage/countries/morocco";
const port = process.env.PORT || 2019;

// init app
const app = express();

// middlewars
app.use(cors());

// init express routing
const router = express.Router();

// define routes
router.get("/", async (req, res) => {
  // define data
  const covidData = (await get(covidURL)).data;
  const vaccineData = (await get(vaccineURL)).data;
  const countryInfo = { name: covidData.country, ...covidData.countryInfo };

  // remove some props
  delete covidData.countryInfo;
  delete covidData.country;
  delete vaccineData.country;

  // return response
  res.json({
    countryInfo,
    covid: covidData,
    vaccine: vaccineData,
  });
});

// use routers
app.use("/", router);

// lunch in a host
app.listen(port, () => {
  console.log(`app running on port ${port} `);
});
