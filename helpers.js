// dependencies
const { get } = require("axios");
const { load } = require("cheerio");

// define variables
const covidBaseURL = "https://disease.sh/v3/covid-19/";
const covidURL = covidBaseURL + "countries/morocco";
const vaccineURL = covidBaseURL + "vaccine/coverage/countries/morocco";
const covidMarocBaseURL = "http://www.covidmaroc.ma";
const countryInfoURL = "https://restcountries.eu/rest/v2/name/morocco";
const advicesURL = covidMarocBaseURL + "/Pages/conseilar.aspx";
const reportsURL = covidMarocBaseURL + "/Pages/CommuniquesAR.aspx";

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

/**
 * @description get official gov reports
 */
async function getReports() {
  let reports = [];

  const body = (await get(reportsURL)).data;
  const $ = load(body);

  $("h4 + table.ms-rteTable-6 a").each(function () {
    const href = $(this).attr("href");
    const linkText = $(this)
      .html()
      .replace(/(&#8203;|&nbsp;)+\S/g, " ");

    // fill reports
    reports.push({
      label: load(linkText).text().trim(),
      link: href && href.startsWith("http") ? href : covidMarocBaseURL + href,
    });
  });

  // result
  return reports;
}

// exports
module.exports = {
  getAdvice,
  getCovid,
  getVaccine,
  getCountryInfo,
  getReports,
};
