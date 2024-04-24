const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./currency_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

// Create currency
const create_currency = (request, response) => {
    //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
    const { currency_code } = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
        connected.query(queries.check_currencyByCode, [currency_code], (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json({ resultCode: "ມີສະກຸນເງິນນີ້ແລ້ວ !" })
          } else {
            connected.query(queries.add_currencyByCode,[currency_code],(error,results)=>{
              if(error)throw error;
            response.json({ resultCode: "ເພີ່ມສະກຸນເງິນສຳເລັດ" })
            })
          }
        })
      }
    })
  }
  // get currency or read currency
  const get_currency = (request, response) => {
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error " });
      } else {
        connected.query(queries.get_currency, (error, results) => {
          if (error) throw error;
          response.json(results);
        })
      }
    })
  }
  //---get currency by id
  const get_currencyById = (request, response) => {
    const { currency_id } = request.body;
  
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error " });
      } else {
        connected.query(queries.get_currencyById, [currency_id], (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json(results[0]);
          } else {
            response.json({ resultCode: "ບໍ່ພົບສະກຸນເງິນນີ້ !" });
          }
        });
      }
    });
  };
  const update_currency = (request, response) => {
    const { currency_id,currency_code} = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
  
        connected.query(queries.get_currencyById, [currency_id], (error, results) => {
          if (error) throw error;
          if (!results.length) {
            // ຖ້າມີບໍ່ໃຫ້ມັນແກ້ໄຂ
  
            response.json({ resultCode: "ບໍ່ອະນຸຍາດໃຫ້ແກ້ໄຂສະກຸນເງິນນີ້" })
  
          } else {
  
            //ຖ້າບໍ່ມີລະໃຫ້ແກ້ໄຂ
            //response.json({ resultCode: "allow to update" })
            //ຄຳສັງແກ້ໄຂ
            connected.query(queries.check_currencyByCode, [currency_code], (error, results) => {
              if (results.length) {
                response.json({ resultCode: "ມີສະກູນເງິນນີ້ຢູ່ແລ້ວ" })
              } else {
                connected.query(queries.update_currency, [currency_code, currency_id], (error, results) => {
                  if (error) throw error;
                  response.json({ resultsCode: "ແກ້ໄຂສະກຸນເງິນສຳເລັດ" });
                  })
              }
            })
  
          }
        })
      }
    });
  }
  
  // delete currency
  const delete_currency = (request, response) => {
    const {currency_code } = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
  
        connected.query(queries.check_currency, [currency_code], (error, results) => {
          if (error) throw error;
          if (results.length) {
            // ຖ້າມີບໍ່ໃຫ້ມັນລົບ
  
            response.json({ resultCode: "ບໍ່ອະນຸຍາດໃຫ້ລົບສະກຸນເງິນນີ້" })
  
          } else {
  
            //ຖ້າບໍ່ມີລະໃຫ້ລົບ
            //response.json({ resultCode: "allow to delete" })
            //ຄຳສັງລົບ
            connected.query(queries.check_currencyByCode, [currency_code], (error, results) => {
              if (!results.length) {
                response.json({ resultCode: "delete error" })
              } else {

                connected.query(queries.delete_currency, [currency_code], (error, results) => {
                response.json({ resultCode: "ການລົບສະກຸນເງິນສຳເລັດ" })
                })

              }
            })
  
          }
        })
      }
    });
  }

module.exports={
    create_currency,
    get_currency,
    get_currencyById,
    update_currency,
    delete_currency
}