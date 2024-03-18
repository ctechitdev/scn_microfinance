const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./loan_contract_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

// const create_loan_contract = (request, response) => {
//   //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
//   const {
//     loan_contract_number,
//     loan_request_id,
//     customer_id,
//     guarantor_id,
//     loan_fee_values,
//     evaluate_asset_fee_values,
//     contract_status,
//     contract_date,
//     add_by,
//   } = request.body;
//   jwt.verify(request.token, secretkey, (token_error, rstoken) => {
//     if (token_error) {
//       response.json({ resultCode: "token error" });
//     } else {
//       connected.query(
//         queries.get_loan_contract,
//         [loan_contract_number],
//         (error, results) => {
//           if (error) throw error;
//           if (results.length) {
//             response.json({ resultCode: "ມີສັນຍາກູ້ຢືມນີ້ແລ້ວ !" });
//           } else {
//             connected.query(
//               queries.add_loan_contract,
//               [
//                 loan_contract_number,
//                 loan_request_id,
//                 customer_id,
//                 guarantor_id,
//                 loan_fee_values,
//                 evaluate_asset_fee_values,
//                 contract_status,
//                 contract_date,
//                 add_by,
//               ],
//               (error, results) => {
//                 if (error) throw error;
//                 response.json({ resultCode: "ເພີ່ມສັນຍາກູ້ຢືມສຳເລັດ" });
//               }
//             );
//           }
//         }
//       );
//     }
//   });
// };
const search_loan_contract = (request, response) => {
  const {  search_box  } = request.body;

  const search_value = "%"+search_box+"%";

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(  queries.search_loan_contract, [ search_value ],
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



module.exports = {
  // create_loan_contract,
  search_loan_contract
};
