const express = require("express");
const router = require("./src/api_route");

const app = express();
const port = 1500;

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Method", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use('/api', router);

app.listen(port, () => console.log(`app listen on port ${port}`));
