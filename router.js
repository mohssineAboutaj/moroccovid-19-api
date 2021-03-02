// dependencies
const { Router } = require("express");
const {
  getCountryInfo,
  getAdvice,
  getCovid,
  getVaccine,
  getReports,
} = require("./helpers");

// define router
const router = Router();

// set routing
/// all
router.get("/", (req, res) => {
  res.json({
    description: "the content is separated is case of performance",
    routes: [
      {
        path: "/covid",
        description: "Covid19 Statistics               ",
        return: "Object",
      },
      {
        path: "/vaccine",
        description: "Vaccinated People                ",
        return: "Object",
      },
      {
        path: "/advice",
        description: "Some Advices To Prevent The Covid",
        return: "Object",
      },
      {
        path: "/country",
        description: "Country Info (Morocco)           ",
        return: "Object",
      },
      {
        path: "/reports",
        description: "Get Gov Official Reports         ",
        return: "Array",
      },
    ],
    advice: {},
    covid: {},
    country: {},
    reports: [],
  });
});
/// country info
router.get("/country", async (req, res) => {
  res.json(await getCountryInfo());
});
/// advice
router.get("/advice", async (req, res) => {
  res.json(await getAdvice());
});
/// covid
router.get("/covid", async (req, res) => {
  res.json(await getCovid());
});
/// vaccine
router.get("/vaccine", async (req, res) => {
  res.json(await getVaccine());
});
/// reports
router.get("/reports", async (req, res) => {
  res.json(await getReports());
});

// exports
module.exports = router;
