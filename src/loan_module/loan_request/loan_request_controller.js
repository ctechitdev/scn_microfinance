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

const get_loan_request = (request, response) => {
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(queries.get_loan_request, (error, results) => {
        if (error) throw error;
        response.json(results);
      })
    }
  })
}

const update_loan_request = (request, response) => {
  const {     
    loan_values_request,
    currency,
    loan_request_status_name,
    reason_request,
    payment_loan_type_name,
    payment_loan_type_value,
    loan_request_id
  } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" })
    } else {
      connected.query(queries.get_loan_request_id, [loan_request_id], (error, results) => {
        const NotFound = !results.length;
        if (NotFound) {
          if (error) throw error;
          response.json({ resultsCode: "ບໍ່ສາມາດແກ້ໄຂ loan request ໄດ້" });
        } else {
          connected.query(queries.update_loan_request, [    
            loan_values_request,
            currency,
            loan_request_status_name,
            reason_request,
            payment_loan_type_name,
            payment_loan_type_value,
            loan_request_id], (error, results) => {
          if (error) throw error;
          response.json({ resultsCode: "ແກ້ໄຂ loan request ສຳເລັດ" });
          })
        }
      });
    }
  });
};
const update_evaluate_status = (request, response) => {
  const {     
    evaluate_status,
    loan_request_id
  } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" })
    } else {
      connected.query(queries.get_loan_request_id, [loan_request_id], (error, results) => {
        const NotFound = !results.length;
        if (NotFound) {
          if (error) throw error;
          response.json({ resultsCode: "ບໍ່ສາມາດແກ້ໄຂ evaluate status ໄດ້" });
        } else {
          connected.query(queries.update_evaluate_status, [    
            evaluate_status,
            loan_request_id], (error, results) => {
          if (error) throw error;
          response.json({ resultsCode: "ແກ້ໄຂ evaluate status ສຳເລັດ" });
          })
        }
      });
    }
  });
};


// delete loan contract
const delete_loan_request = (request, response) => {
  const { loan_request_id } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(queries.get_loan_request_id, [loan_request_id], (error, results) => {
        const NotFound = !results.length;
        if (NotFound) {
          if (error) throw error;
          response.json({ resultsCode: "ລົບ loan request ບໍ່ໄດ້" });
        } else {
          connected.query(queries.delete_loan_request, [loan_request_id], (error, results) => {
            if (error) throw error;
            response.json({ resultsCode: "ລົບ loan request ສຳເລັດ" });
          });
        }
      });
    }
  });
};
module.exports = {
  create_loan_request,
  get_loan_request,
  update_loan_request,
  delete_loan_request,
  update_evaluate_status
  
};
