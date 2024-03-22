const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./asset_credit_cust_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

// Create asset_credit_customer
const create_asset_credit = (request, response) => {
  //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
  const {
    asset_type_customer_name,
    asset_detail,
    asset_credit_values,
    limit_credit_values,
    currency,
    asset_status,
    customer_id,
    add_by,
    evaluate_by,
    evaluate_date,
    guarantee_picture
  } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.add_asset_credit,
        [
          asset_type_customer_name,
          asset_detail,
          asset_credit_values,
          limit_credit_values,
          currency,
          asset_status,
          customer_id,
          add_by,
          evaluate_by,
          evaluate_date,
          guarantee_picture
        ],
        (error, results) => {
          if (error) {
            response.json({ resultCode: "add error!" });
          } else {
            response.json({ resultCode: " ເພີ່ມຊັບສິນລູກຄ້າສຳເລັດ" });
          }
        }
      );
    }
  });
};

// Get all asset credit customer
const get_asset_credit = (request, response) => {
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(queries.get_asset_credit, (error, results) => {
        if (error) throw error;
        response.json(results);
      });
    }
  });
};

// search_asset_credit
const search_asset_credit = (request, response) => {
  const {  search_box  } = request.body;

  const search_value = "%"+search_box+"%";

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(  queries.search_asset_credit, [ search_value , search_value ],
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


const update_asset_credit = (request, response) => {
  const {
    asset_credit_customer_id,
    asset_type_customer_name,
    asset_detail,
    asset_credit_values,
    limit_credit_values,
    currency,
    guarantee_picture,
  } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.get_asset_credit_ById,
        [asset_credit_customer_id],
        (error, results) => {
          const no_asset_credit_Found = !results.length;
          if (no_asset_credit_Found) {
            if (error) throw error;
            response.json({ resultsCode: "ບໍ່ສາມາດແກ້ໄຂສັບສິນລູກຄ້າໄດ້" });
          } else {
            connected.query(
              queries.update_asset_credit,
              [
                asset_type_customer_name,
                asset_detail,
                asset_credit_values,
                limit_credit_values,
                currency,
                guarantee_picture,
                asset_credit_customer_id,
              ],
              (error, results) => {
                if (error) throw error;
                response.json({ resultsCode: "ແກ້ໄຂສັບສິນລູກຄ້າສຳເລັດ" });
              }
            );
          }
        }
      );
    }
  });
};

// const update_check_asset_credit_customer = (request, response) => {
//   const { asset_credit_customer_id,asset_credit_values, limit_credit_values, currency } =
//     request.body;

//   jwt.verify(request.token, secretkey, (token_error, rstoken) => {
//     if (token_error) {
//       response.json({ resultCode: "token error" });
//     } else {
//       connected.query(
//         queries.update_check_asset_credit_customer,
//         [asset_credit_values,limit_credit_values, currency, asset_credit_customer_id],
//         (error, results) => {
//           if (error) throw error;
//           response.json({ resultsCode: "ອັບເດດຂໍ້ມູນການກວດສອບສຳເລັດ" });
//         }
//       );
//     }
//   });
// };

//delete customer
const delete_asset_credit = (request, response) => {
  const { asset_credit_customer_id } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.get_asset_credit_ById,
        [asset_credit_customer_id],
        (error, results) => {
          if (error) throw error;
          if (!results.length) {
            // ຖ້າມີບໍ່ໃຫ້ມັນລົບ
            response.json({ resultCode: "ບໍ່ອະນຸຍາດໃຫ້ລົບ ສັບສິນລູກຄ້າ ນີ້" });
          } else {
            connected.query(
              queries.delete_asset_credit,
              [asset_credit_customer_id],
              (error, results) => {
                if (error) {
                  response.json({ resultCode: "delete error" });
                } else {
                  response.json({ resultCode: "ການລົບ ສັບສິນລູກຄ້າ ສຳເລັດ" });
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
  create_asset_credit,
  get_asset_credit,
  update_asset_credit,
  // update_check_asset_credit_customer,
  delete_asset_credit,
  search_asset_credit,
};
