const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./cif_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

// search customer for adding into the cif
const search_customer_add_cif = (request, response) => {
  const { search_box } = request.body;

  const search_value = "%" + search_box + "%";

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.search_cutomer_as_cif,
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
// Create cif
const create_cif = (request, response) => {
    //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
    const {
      customer_id, CIF_SCN_status

    } = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" });
      } else {
        connected.query(
          queries.get_customer_id,
          [customer_id],
          (error, results) => {
            if (error) throw error;
            if (results.length) {
              response.json({ resultCode: "ມີເລກທະບຽນນີ້ແລ້ວ !" });
            } else {
              connected.query(
                queries.add_cif,
                [
                  customer_id, CIF_SCN_status
                ],
                (error, results) => {
                  if (error) throw error;
                  response.json({ resultCode: "ເພີ່ມເລກທະບຽນສຳເລັດ" });
                }
              );
            }
          }
        );
      }
    });
  };

module.exports = {
  search_customer_add_cif,
  create_cif
};
