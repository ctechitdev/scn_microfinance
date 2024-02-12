const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./show_user_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

const show_user = (request, response) => {
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(queries.active, (error, results) => {
        if (error) throw error;
        response.json(results);
      });
    }
  });
};
const show_userByData = (request, response) => {
  const { user_id, full_name, user_name, depart_name, role_name} = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(
        queries.show_userByData,
        [user_id, full_name, user_name, depart_name, role_name],
        (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json(results);
          } else {
            response.json({ resultCode: "ບໍ່ພົບ user ນີ້ !" });
          }
        }
      );
    }
  });
};

// router is in master data route
module.exports = {
  show_user,
  show_userByData,
};
