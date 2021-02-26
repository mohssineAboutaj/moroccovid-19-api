// import dependencies
const express = require("express");
const { get } = require("axios");

const sourceURL = "https://disease.sh/v3/covid-19/countries/morocco";
const port = process.env.PORT || 2019;

// init app
const app = express();

// init express routing
const router = express.Router();

// define routes
router.get("/", (req, res) => {
  get(sourceURL)
    .then(({ data }) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        status: "error",
        error: err,
      });
    });
});

// use routers
app.use("/", router);

// lunch in a host
app.listen(port, () => {
  console.log(`app running on port ${port} `);
});
