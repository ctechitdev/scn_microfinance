const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./loan_request_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";



module.exports={

};