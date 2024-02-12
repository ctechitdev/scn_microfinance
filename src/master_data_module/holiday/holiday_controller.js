const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./holiday_query");


const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";


// Create holiday
const create_holiday = (request, response) => {
  //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
  const { holiday_name,holiday_category_id, holiday_date } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" })
    } else {
      connected.query(queries.check_holidayByName, [holiday_name], (error, results) => {
        if (error) throw error;
        if (results.length) {
          response.json({ resultCode: "ມີວັນພັກນີ້ແລ້ວ" })
        } else {
          connected.query(queries.add_holidayByname, [holiday_name,holiday_category_id, holiday_date], (error, results) => {
            if (error) throw error;
            response.json({ resultCode: "ເພີ່ມວັນພັກສຳເລັດ" })
          })
        }
      })
    }
  })
}
// get holiday or read holiday
const get_holiday = (request, response) => {
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(queries.get_holiday, (error, results) => {
        if (error) throw error;
        response.json(results);
      })
    }
  })
}
//---get holiday by id
const get_holidayById = (request, response) => {
  const { holiday_id } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(queries.get_holidayById, [holiday_id], (error, results) => {
        if (error) throw error;

        // if there are data inside
        if (results.length) {
          //Return the json message
          response.json(results);
          //if undefind show the json message
        } else {
          response.json({ resultCode: "ບໍ່ພົບວັນພັກນີ້ !" });
        }
      });
    }
  });
};

// update holiday
const update_holiday = (request, response) => {
  const { holiday_id, holiday_name,holiday_date } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" })
    } else {
      connected.query(queries.get_holidayById, [holiday_id], (error, results) => {
        const noholidayFound = !results.length;
        if (noholidayFound) {
          if (error) throw error;
          response.json({ resultsCode: "ບໍ່ສາມາດແກ້ໄຂວັນພັກໄດ້" });
        } else {
          connected.query(queries.update_holiday, [holiday_name, holiday_id,holiday_date], (error, results) => {
            if (error) throw error;
            response.json({ resultsCode: "ແກ້ໄຂວັນພັກສຳເລັດ" });
          })
        }
      });
    }
  });
};

// delete holiday
const delete_holiday = (request, response) => {
  const { holiday_id } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(queries.get_holidayById, [holiday_id], (error, results) => {
        const noholidayFound = !results.length;
        if (noholidayFound) {
          if (error) throw error;
          response.json({ resultsCode: "ລົບວັນພັກບໍ່ໄດ້" });
        } else {
          connected.query(queries.delete_holiday, [holiday_id], (error, results) => {
            if (error) throw error;
            response.json({ resultsCode: "ລົບວັນພັກສຳເລັດ" });
          });
        }
      });
    }
  });
};


module.exports = {
  create_holiday,
  get_holiday,
  get_holidayById,
  update_holiday,
  delete_holiday
};