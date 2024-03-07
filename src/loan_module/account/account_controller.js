const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./account_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

// Create account
const create_account = (request, response) => {
  //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
  const {
    account_number,
    CIF_id,
    customer_id,
    account_balance,
    account_by_branch,
    account_type_id,
    account_status,
    currency_code,
    create_by,
    date_update
  } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.check_account_number,
        [account_number],
        (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json({ resultCode: "ມີບັນຊີນີ້ແລ້ວ !" });
          } else {
            connected.query(
              queries.add_accountByCode,
              [
                account_number,
                CIF_id,
                customer_id,
                account_by_branch,
                account_balance,
                account_type_id,
                account_status,
                currency_code,
                create_by,
                date_update
              ],
              (error, results) => {
                if (error) throw error;
                response.json({ resultCode: "ເພີ່ມບັນຊີສຳເລັດ" });
              }
            );
          }
        }
      );
    }
  });
};
// get account or read account
const get_account = (request, response) => {
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(queries.get_account, (error, results) => {
        if (error) throw error;
        response.json(results);
      });
    }
  });
};

module.exports = {
  create_account,
  get_account,
};
