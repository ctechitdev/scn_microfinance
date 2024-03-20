const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./show_user_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";


const search_user = (request, response) => {
  const { search_box } = request.body;

  const search_value = "%" + search_box + "%";

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.search_user,
        [search_value, search_value],
        (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json(results);
          } else {
            response.json({ resultCode: "search error" });
          }
        }
      );
    }
  });
};

  // update ປະເພດວັນພັກ
  const delete_user = (request, response) => {
    const { user_id } = request.body;
  
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
        connected.query(queries.get_user, [user_id], (error, results) => {
          const notFound = !results.length;
          if (notFound) {
            if (error) throw error;
            response.json({ resultsCode: "ບໍ່ສາມາດລົບ user ໄດ້" });
          } else {
            connected.query(queries.delete_user, [user_id], (error, results) => {
            if (error) throw error;
            response.json({ resultsCode: "ລົບ user ສຳເລັດ" });
            })
          }
        });
      }
    });
  };

// router is in master data route
module.exports = {
  delete_user,
  search_user,
};
