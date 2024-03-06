const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./province_query");


const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

// Create province
const add_province = (request, response) => {
    //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
    const {province_name } = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
        connected.query(queries.get_province_name, [province_name], (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json({ resultCode: "ມີແຂວງນີ້ແລ້ວ" })
          } else {
            connected.query(queries.add_province, [province_name], (error, results) => {
              if (error) throw error;
              response.json({ resultCode: "ເພີ່ມແຂວງສຳເລັດ" })
            })
          }
        })
      }
    })
  }
  // get province or read province
const get_province = (request, response) => {
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error " });
      } else {
        connected.query(queries.get_province, (error, results) => {
          if (error) throw error;
          response.json(results);
        })
      }
    })
  }
  //---get province by id
const get_province_id = (request, response) => {
    const { province_id } = request.body;
  
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error " });
      } else {
        connected.query(queries.get_province_id, [province_id], (error, results) => {
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
  const update_province = (request, response) => {
    const { province_id,province_name} = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
  
        connected.query(queries.get_province_id, [province_id], (error, results) => {
          if (error) throw error;
          if (!results.length) {
            // ຖ້າມີບໍ່ໃຫ້ມັນແກ້ໄຂ
  
            response.json({ resultCode: "ບໍ່ອະນຸຍາດໃຫ້ແກ້ໄຂແຂວງນີ້" })
  
          } else {
            connected.query(queries.get_province_name, [province_name], (error, results) => {
              if (results.length) {
                response.json({ resultCode: "ມີແຂວງນີ້ຢູ່ແລ້ວ" })
              } else {
                connected.query(queries.update_province, [province_name, province_id], (error, results) => {
                  if (error) throw error;
                  response.json({ resultsCode: "ແກ້ໄຂແຂວງສຳເລັດ" });
                  })
              }
            })
  
          }
        })
      }
    });
  }
    // delete province
    const delete_province = (request, response) => {
        const {province_id } = request.body;
        jwt.verify(request.token, secretkey, (token_error, rstoken) => {
          if (token_error) {
            response.json({ resultCode: "token error" })
          } else {
      
            connected.query(queries.check_province, [province_id], (error, results) => {
              if (error) throw error;
              if (results.length) {
                // ຖ້າມີບໍ່ໃຫ້ມັນລົບ
      
                response.json({ resultCode: "ບໍ່ອະນຸຍາດໃຫ້ລົບແຂວງນີ້" })
      
              } else {
      
                //ຖ້າບໍ່ມີລະໃຫ້ລົບ
                //response.json({ resultCode: "allow to delete" })
                //ຄຳສັງລົບ
                connected.query(queries.get_province_id, [province_id], (error, results) => {
                  if (!results.length) {
                    response.json({ resultCode: "delete error" })
                  } else {
                    connected.query(queries.check_province_district, [province_id], (error, results) => {
                      if (results.length) {
                        response.json({ resultCode: "ບໍ່ອະນຸຍາດໃຫ້ລົບແຂວງນີ້" })
                      } else{
                        connected.query(queries.delete_province, [province_id], (error, results) => {
                          response.json({ resultCode: "ການລົບແຂວງສຳເລັດ" })
                          })
                      }
                    })

    
                  }
                })
      
              }
            })
          }
        });
      }

module.exports={
    add_province,
    get_province,
    get_province_id,
    update_province,
    delete_province
}