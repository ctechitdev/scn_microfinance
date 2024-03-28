const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./loan_status_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

// Create loan_request_status
const create_loan_request_status = (request, response) => {
    //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
    const { loan_request_status_name } = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
        connected.query(queries.get_loan_status_name, [loan_request_status_name], (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json({ resultCode: "ມີ loan request status ນີ້ແລ້ວ !" })
          } else {
            connected.query(queries.add_loan_status,[loan_request_status_name],(error,results)=>{
              if(error)throw error;
            response.json({ resultCode: "ເພີ່ມ loan request status ສຳເລັດ" })
            })
          }
        })
      }
    })
  };
    // get loan_request_status or read loan_request_status
    const get_loan_request_status = (request, response) => {
        jwt.verify(request.token, secretkey, (token_error, rstoken) => {
          if (token_error) {
            response.json({ resultCode: "token error " });
          } else {
            connected.query(queries.get_loan_request_status, (error, results) => {
              if (error) throw error;
              response.json(results);
            })
          }
        })
      };

      const search_loan_request_status = (request, response) => {
        const {  search_box  } = request.body;
      
        const search_value = "%"+search_box+"%";
      
        jwt.verify(request.token, secretkey, (token_error, rstoken) => {
          if (token_error) {
            response.json({ resultCode: "token error" });
          } else {
            connected.query(  queries.search, [ search_value , search_value ],
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

module.exports={
    create_loan_request_status,
    get_loan_request_status,
    search_loan_request_status
};