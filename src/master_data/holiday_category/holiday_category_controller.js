const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./holiday_category_query");


const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";


// Create depart
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
            response.json({ resultCode: "Depart cate is already exit" })
          } else {
            connected.query(queries.add_holidaycate_Byname,[holiday_category_name],(error,results)=>{
              if(error)throw error;
            response.json({ resultCode: "Add depart successful" })
            })
          }
        })
      }
    })
  }
  // get role or read role
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
  //---get depart by id
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
  
  // update depart
  const update_holidaycate = (request, response) => {
    const { holiday_category_id, holiday_category_name } = request.body;
  
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
        connected.query(queries.get_holiday_cateById, [holiday_category_id], (error, results) => {
          const noDepartFound = !results.length;
          if (noDepartFound) {
            if (error) throw error;
            response.json({ resultsCode: "ບໍ່ສາມາດແກ້ໄຂໄດ້" });
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