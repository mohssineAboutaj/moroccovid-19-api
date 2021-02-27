// import dependencies
const express = require("express");
const cors = require("cors");
const router = require("./router");

// variables
const port = process.env.PORT || 2019;

// init app
const app = express();

// middlewars
app.use(cors());

// use routers
app.use("/", router);

// lunch in a host
app.listen(port, () => {
  console.log(`app running on port ${port} `);
});
