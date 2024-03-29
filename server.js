const express = require("express");
const router_autherize = require("./src/router/autherize_user");
const router_mater_data = require("./src/router/master_data");
const router_loan = require("./src/router/loan");
const router_finance = require("./src/router/finance");



const app = express();
const port = 5050;


app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Method", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


app.use('/autherize', router_autherize);
app.use('/masterdata', router_mater_data);
app.use('/loan', router_loan);
app.use('/finance',router_finance);


app.listen(port, () => console.log(`app listen on port ${port}`));
