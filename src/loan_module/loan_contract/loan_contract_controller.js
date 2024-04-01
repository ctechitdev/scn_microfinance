const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./loan_contract_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

const create_loan_contract = (request, response) => {
  //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
  const {               
    loan_contract_number,
    loan_request_id,
    customer_id,
    guarantor_id,
    loan_fee_values,
    evaluate_asset_fee_values,
    contract_status,
    contract_date
  } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.get_loan_contract_num,
        [
          loan_contract_number
        ],
        (error, results) => {
          if (error) throw error;
          const Found_Contract = results.length;
          if (Found_Contract) {
            if (error) throw error;
            response.json({ resultCode: "ມີສັນຍາກູ້ຢືມນີ້ແລ້ວ !" });
          } else {
            connected.query(
              queries.add_loan_contract,
              [
                loan_contract_number,
                loan_request_id,
                customer_id,
                guarantor_id,
                loan_fee_values,
                evaluate_asset_fee_values,
                contract_status,
                contract_date
              ],
              (error, results) => {
                if (error) throw error;
                response.json({
                  resultCode: "ເພີ່ມສັນຍາກູ້ຢືມສຳເລັດ",
                });
              }
            );
          }
        }
      );
    }
  });
};

// search customer for adding into the laon contract
const search_customer_add_contract = (request, response) => {
  const { search_box } = request.body;

  const search_value = "%" + search_box + "%";

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.search_cutomer_as_contract,
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
// search loan contract after create loan contract successful
const search_loan_contract = (request, response) => {
  const { search_box } = request.body;

  const search_value = "%" + search_box + "%";

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.search_loan_contract,
        [search_value, search_value, search_value],
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

// make ລູກຄ້າກັບ loan request ...

// update loan contract
const update_loan_contract = (request, response) => {
  const { customer_id, loan_request_id, loan_contract_id } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.get_loan_contract_id,
        [loan_contract_id],
        (error, results) => {
          const NotFound = !results.length;
          if (NotFound) {
            if (error) throw error;
            response.json({ resultsCode: "ບໍ່ສາມາດແກ້ໄຂ loan contract ໄດ້" });
          } else {
            connected.query(
              queries.update_loan_contract,
              [customer_id, loan_request_id, loan_contract_id],
              (error, results) => {
                if (error) throw error;
                response.json({ resultsCode: "ແກ້ໄຂ loan contract ສຳເລັດ" });
              }
            );
          }
        }
      );
    }
  });
};
// delete loan contract
const delete_loan_contract = (request, response) => {
  const { loan_contract_id } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.get_loan_contract_id,
        [loan_contract_id],
        (error, results) => {
          const NotFound = !results.length;
          if (NotFound) {
            if (error) throw error;
            response.json({ resultsCode: "ລົບ loan contract ບໍ່ໄດ້" });
          } else {
            connected.query(
              queries.delete_loan_contract,
              [loan_contract_id],
              (error, results) => {
                if (error) throw error;
                response.json({ resultsCode: "ລົບ loan contract ສຳເລັດ" });
              }
            );
          }
        }
      );
    }
  });
};

module.exports = {
  search_customer_add_contract,
  update_loan_contract,
  search_loan_contract,
  delete_loan_contract,
  create_loan_contract,
};
