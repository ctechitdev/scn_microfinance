const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./loan_request_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

// Create loan_request_customer
const create_loan_request = (request, response) => {
  //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
  const {
    customer_id,
    loan_values_request,
    currency,
    loan_request_status_name,
    reason_request,
    payment_loan_type_name,
    payment_loan_type_value,
    add_by
  } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.add_loan_request,
        [
          customer_id,
          loan_values_request,
          currency,
          loan_request_status_name,
          reason_request,
          payment_loan_type_name,
          payment_loan_type_value,
          add_by
        ],
        (error, results) => {
          if (error) {
            response.json({ resultCode: "add error!" });
          } else {
            response.json({ resultCode: " ເພີ່ມຄຳຂໍປ່ອຍກູ້ສຳເລັດ" });
          }
        }
      );
    }
  });
};
module.exports = {
  create_loan_request,
};
