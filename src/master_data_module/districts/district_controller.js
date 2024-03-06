const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./district_query");


const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

// Create districts
const add_districts = (request, response) => {
    //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
    const {province_id,districts_name} = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
        connected.query(queries.get_districts_name, [districts_name], (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json({ resultCode: "ມີເມືອງນີ້ແລ້ວ" })
          } else {
            connected.query(queries.add_districts, [province_id,districts_name], (error, results) => {
              if (error) throw error;
              response.json({ resultCode: "ເພີ່ມເມືອງສຳເລັດ" })
            })
          }
        })
      }
    })
  }
  // get districts or read districts
const get_districts = (request, response) => {
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error " });
      } else {
        connected.query(queries.get_districts, (error, results) => {
          if (error) throw error;
          response.json(results);
        })
      }
    })
  }
  //---get districts by id
const get_districts_id = (request, response) => {
    const { districts_id } = request.body;
  
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error " });
      } else {
        connected.query(queries.get_districts_id, [districts_id], (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json(results);
          } else {
            response.json({ resultCode: "ບໍ່ພົບເມືອງນີ້ !" });
          }
        });
      }
    });
  };
  // update districts
  const update_districts = (request, response) => {
    const { districts_id,province_id,districts_name} = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
  
        connected.query(queries.get_districts_id, [districts_id], (error, results) => {
          if (error) throw error;
          if (!results.length) {
            // ຖ້າມີບໍ່ໃຫ້ມັນແກ້ໄຂ
  
            response.json({ resultCode: "ບໍ່ອະນຸຍາດໃຫ້ແກ້ໄຂເມືອງນີ້" })
  
          } else {
            connected.query(queries.get_districts_name, [districts_name], (error, results) => {
              if (results.length) {
                response.json({ resultCode: "ມີເມືອງນີ້ຢູ່ແລ້ວ" })
              } else {
                connected.query(queries.check_province_id, [province_id], (error, results) => {
                    if (!results.length) {
                        response.json({ resultCode: "ບໍ່ມີໄອດີແຂວງນີ້ໃນລະບົບ !" })
                      }else{
                        connected.query(queries.update_districts, [province_id,districts_name, districts_id], (error, results) => {
                            if (error) throw error;
                            response.json({ resultsCode: "ແກ້ໄຂເມືອງສຳເລັດ" });
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
    // delete districts
    const delete_districts = (request, response) => {
        const {districts_id } = request.body;
        jwt.verify(request.token, secretkey, (token_error, rstoken) => {
          if (token_error) {
            response.json({ resultCode: "token error" })
          } else {
      
            connected.query(queries.check_districts, [districts_id], (error, results) => {
              if (error) throw error;
              if (results.length) {
                // ຖ້າມີບໍ່ໃຫ້ມັນລົບ
      
                response.json({ resultCode: "ບໍ່ອະນຸຍາດໃຫ້ລົບເມືອງນີ້" })
      
              } else {
      
                //ຖ້າບໍ່ມີລະໃຫ້ລົບ
                //response.json({ resultCode: "allow to delete" })
                //ຄຳສັງລົບ
                connected.query(queries.get_districts_id, [districts_id], (error, results) => {
                  if (!results.length) {
                    response.json({ resultCode: "delete error" })
                  } else {
                    connected.query(queries.delete_districts, [districts_id], (error, results) => {
                        response.json({ resultCode: "ການລົບເມືອງສຳເລັດ" })
                        })

    
                  }
                })
      
              }
            })
          }
        });
      }

module.exports={
    add_districts,
    get_districts,
    get_districts_id,
    update_districts,
    delete_districts
}