const { get } = require("axios");
const { load } = require("cheerio");
const { Router } = require("express");

// define router
const router = Router();

// define variables
const baseURL = "https://disease.sh/v3/covid-19/";
const covidURL = baseURL + "countries/morocco";
const vaccineURL = baseURL + "vaccine/coverage/countries/morocco";
const advicesURL = "http://www.covidmaroc.ma/Pages/conseilar.aspx";

// set routing
router.get("/", async (req, res) => {
  // define & fill
  const covidData = (await get(covidURL)).data;
  const vaccineData = (await get(vaccineURL)).data;
  const countryInfo = { name: covidData.country, ...covidData.countryInfo };
  const body = (await get(advicesURL)).data;
  const $ = load(body);
  const advice = { images: [] };

  JSON.parse(
    $("body script")
      .eq(6)
      .html()
      .split("pictureArray = ")[1]
      .split(";")[0]
      .replace(/'/g, '"')
  ).forEach((img) => {
    if (img) {
      advice.images.push(img);
    }
  });

  // remove some props
  delete covidData.countryInfo;
  delete covidData.country;
  delete vaccineData.country;

  // return response
  res.json({
    countryInfo,
    covid: covidData,
    vaccine: vaccineData,
    advice,
  });
});

// exports
module.exports = router;
