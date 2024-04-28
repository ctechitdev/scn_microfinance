const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./account_type_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

const get_account_type = (request, response) => {
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error " });
      } else {
        connected.query(queries.get_account_type, (error, results) => {
          if (error) throw error;
          response.json(results);
        })
      }
    })
  }
  //---get currency by id
  const get_account_type_id = (request, response) => {
    const { account_type_id } = request.body;
  
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error " });
      } else {
        connected.query(queries.get_id, [account_type_id], (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json(results[0]);
          } else {
            response.json({ resultCode: "ບໍ່ພົບປະເພດບັນຊີນີ້ !" });
          }
        });
      }
    });
  };

  module.exports = {
    get_account_type,
    get_account_type_id
  };