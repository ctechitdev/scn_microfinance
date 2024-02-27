const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./holiday_category_query");


const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";


// Create ປະເພດວັນພັກ
const create_holidaycate = (request, response) => {
    //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
    const { holiday_category_name } = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
        connected.query(queries.check_holiday_cateByName, [holiday_category_name], (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json({ resultCode: "ມີປະເພດວັນພັກນີ້ແລ້ວ" })
          } else {
            connected.query(queries.add_holiday_cateByname,[holiday_category_name],(error,results)=>{
              if(error)throw error;
            response.json({ resultCode: "ເພີ່ມປະເພດວັນພັກສຳເລັດ" })
            })
          }
        })
      }
    })
  }
  // get holiday category
  const get_holidaycate = (request, response) => {
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error " });
      } else {
        connected.query(queries.get_holiday_cate, (error, results) => {
          if (error) throw error;
          response.json(results);
        })
      }
    })
  }
  //---get ປະເພດວັນພັກ by id
  const get_holidaycateById = (request, response) => {
    const { holiday_category_id } = request.body;
  
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error " });
      } else {
        connected.query(queries.get_holiday_cateById, [holiday_category_id], (error, results) => {
          if (error) throw error;
  
          // if there are data inside
          if (results.length) {
            //Return the json message
            response.json(results);
            //if undefind show the json message
          } else {
            response.json({ resultCode: "ບໍ່ພົບປະເພດວັນພັກນີ້ !" });
          }
        });
      }
    });
  };
  
  // update ປະເພດວັນພັກ
  const update_holidaycate = (request, response) => {
    const { holiday_category_id, holiday_category_name } = request.body;
  
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
        connected.query(queries.get_holiday_cateById, [holiday_category_id], (error, results) => {
          const notFound = !results.length;
          if (notFound) {
            if (error) throw error;
            response.json({ resultsCode: "ບໍ່ສາມາດແກ້ໄຂປະເພດວັນພັກໄດ້" });
          } else {
            connected.query(queries.update_holiday_cate, [holiday_category_name, holiday_category_id], (error, results) => {
            if (error) throw error;
            response.json({ resultsCode: "ແກ້ໄຂປະເພດວັນພັກສຳເລັດ" });
            })
          }
        });
      }
    });
  };


module.exports = {
    create_holidaycate,
    get_holidaycate,
    get_holidaycateById,
    update_holidaycate,
};