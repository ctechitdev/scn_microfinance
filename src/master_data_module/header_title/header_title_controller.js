const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./header_title_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

const add_header_title = (request, response) => {
    //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
    const {header_title_name } = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
        connected.query(queries.get_header_title_name, [header_title_name], (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json({ resultCode: "ມີ header title ນີ້ແລ້ວ" })
          } else {
            connected.query(queries.add_header_title, [header_title_name], (error, results) => {
              if (error) throw error;
              response.json({ resultCode: "ເພີ່ມ header title ສຳເລັດ" })
            })
          }
        })
      }
    })
  }

    // get province or read province
const get_header_title = (request, response) => {
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error " });
      } else {
        connected.query(queries.get_header_title, (error, results) => {
          if (error) throw error;
          response.json(results);
        })
      }
    })
  }
  //---get province by id
const get_header_title_id = (request, response) => {
    const { get_header_title_id } = request.body;
  
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error " });
      } else {
        connected.query(queries.get_header_title_id, [get_header_title_id], (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json(results);
          } else {
            response.json({ resultCode: "ບໍ່ພົບແຂວງນີ້ !" });
          }
        });
      }
    });
  };

  // update province
  const update_header_title = (request, response) => {
    const { header_title_id,header_title_name} = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
  
        connected.query(queries.get_header_title_id, [header_title_id], (error, results) => {
          if (error) throw error;
          if (!results.length) {
            // ຖ້າມີບໍ່ໃຫ້ມັນແກ້ໄຂ
  
            response.json({ resultCode: "ບໍ່ອະນຸຍາດໃຫ້ແກ້ໄຂ header title ນີ້" })
  
          } else {
            connected.query(queries.get_header_title_name, [header_title_name], (error, results) => {
              if (results.length) {
                response.json({ resultCode: "ມີ header title ນີ້ຢູ່ແລ້ວ" })
              } else {
                connected.query(queries.update_header_title, [header_title_name, header_title_id], (error, results) => {
                  if (error) throw error;
                  response.json({ resultsCode: "ແກ້ໄຂ header title ສຳເລັດ" });
                  })
              }
            })
  
          }
        })
      }
    });
  }
module.exports={
    add_header_title,
    get_header_title,
    get_header_title_id,
    update_header_title
};