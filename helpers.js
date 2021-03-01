// dependencies
const { get } = require("axios");
const { load } = require("cheerio");

// define variables
const covidBaseURL = "https://disease.sh/v3/covid-19/";
const covidURL = covidBaseURL + "countries/morocco";
const vaccineURL = covidBaseURL + "vaccine/coverage/countries/morocco";
const advicesURL = "http://www.covidmaroc.ma/Pages/conseilar.aspx";
const countryInfoURL = "https://restcountries.eu/rest/v2/name/morocco";

/**
 * @description get covid statistics
 */
async function getCovid() {
  const covidData = (await get(covidURL)).data;

  // remove some props
  delete covidData.countryInfo;
  delete covidData.country;

  // result
  return covidData;
}

/**
 * @description get vaccinated people
 */
async function getVaccine() {
  const vaccineData = (await get(vaccineURL)).data;

  // remove some props
  delete vaccineData.country;

  // result
  return vaccineData;
}

/**
 * @description get advices from the official gov website
 */
async function getAdvice() {
  const advice = { images: [] };

  const body = (await get(advicesURL)).data;
  const $ = load(body);

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

  // result
  return advice;
}

/**
 * @description get coutry info
 */
async function getCountryInfo() {
  return (await get(countryInfoURL)).data;
}

// exports
module.exports = { getAdvice, getCovid, getVaccine, getCountryInfo };
