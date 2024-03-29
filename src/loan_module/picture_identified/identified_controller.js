const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./identified_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

const create_picture_identified = (request, response) => {
  //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
  const {
    customer_id,
    picture_identified_name,
    picture_name_file,
    identified_register_date,
    identified_expire_date,
    picture_identified_type,
  } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.get_picture_identified_name,
        [picture_identified_name],
        (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json({ resultCode: "ມີ identified ນີ້ແລ້ວ !" });
          } else {
            connected.query(
              queries.add_identified,
              [
                customer_id,
                picture_identified_name,
                picture_name_file,
                identified_register_date,
                identified_expire_date,
                picture_identified_type,
              ],
              (error, results) => {
                if (error) throw error;
                response.json({ resultCode: "ເພີ່ມ identified ສຳເລັດ" });
              }
            );
          }
        }
      );
    }
  });
};
// get identified or read identified
const get_identified = (request, response) => {
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(queries.get_identified, (error, results) => {
        if (error) throw error;
        response.json(results);
      });
    }
  });
};

const update_identified = (request, response) => {
  const {
    picture_identified_name,
    picture_name_file,
    identified_register_date,
    identified_expire_date,
    picture_identified_type,
    picture_identified_id,
  } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.get_identified_id,
        [picture_identified_id],
        (error, results) => {
          if (error) throw error;
          if (!results.length) {
            // ຖ້າມີບໍ່ໃຫ້ມັນແກ້ໄຂ

            response.json({ resultCode: "ບໍ່ອະນຸຍາດໃຫ້ແກ້ identified ນີ້" });
          } else {
            //ຖ້າບໍ່ມີລະໃຫ້ແກ້ໄຂ
            //response.json({ resultCode: "allow to update" })
            //ຄຳສັງແກ້ໄຂ
            connected.query(
              queries.get_picture_identified_name,
              [picture_identified_name],
              (error, results) => {
                if (results.length) {
                  response.json({ resultCode: "ມີ identified ນີ້ຢູ່ແລ້ວ" });
                } else {
                  connected.query(
                    queries.update_identified,
                    [
                      picture_identified_name,
                      picture_name_file,
                      identified_register_date,
                      identified_expire_date,
                      picture_identified_type,
                      picture_identified_id,
                    ],
                    (error, results) => {
                      if (error) throw error;
                      response.json({ resultsCode: "ແກ້ໄຂ identified ສຳເລັດ" });
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  });
};

module.exports = {
  create_picture_identified,
  get_identified,
  update_identified,
};
