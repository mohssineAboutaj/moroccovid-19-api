// dependencies
const { Router } = require("express");
const { getAdvice, getCovid, getVaccine } = require("./helpers");

// define router
const router = Router();

// set routing
/// all
router.get("/", async (req, res) => {
  res.json({
    covid: await getCovid(),
    vaccine: await getVaccine(),
    advice: await getAdvice(),
  });
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

// exports
module.exports = router;
