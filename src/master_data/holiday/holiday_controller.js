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
  const { holiday_name } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" })
    } else {
      connected.query(queries.check_holidayByName, [holiday_name], (error, results) => {
        if (error) throw error;
        if (results.length) {
          response.json({ resultCode: "holiday is already exit" })
        } else {
           connected.query(queries.add_holidayByname,[holiday_name],(error,results)=>{
           if(error)throw error;
          response.json({ resultCode: "Add holiday successful" })
          })
        }
      })
    }
  })
}
// get role or read role
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
          response.json({ resultCode: "ບໍ່ພົບພະແນກນີ້ !" });
        }
      });
    }
  });
};

// update holiday
const update_holiday = (request, response) => {
  const { holiday_id, holiday_name } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" })
    } else {
      connected.query(queries.get_holidayById, [holiday_id], (error, results) => {
        const noholidayFound = !results.length;
        if (noholidayFound) {
          if (error) throw error;
          response.json({ resultsCode: "ບໍ່ສາມາດແກ້ໄຂໄດ້" });
        } else {
           connected.query(queries.update_holiday, [holiday_name, holiday_id], (error, results) => {
          if (error) throw error;
          response.json({ resultsCode: "ແກ້ໄຂພະແນກສຳເລັດ" });
           })
        }
      });
    }
  });
};

// // delete holiday
// const delete_holiday = (request, response)=>{
//   const {holiday_id} = request.body;
//   jwt.verify(request.token, secretkey, (token_error, rstoken) => {
//     if (token_error) {
//       response.json({ resultCode: "token error" })
//     }else{
//       connected.query(queries.get_holidayById, [holiday_id], (error, results) => {
//         const checkholidayInUser = queries.check_holidayInUser;
//         const { checkholidayInUserholiday} = results[0];
//         if (checkholidayInUserholiday){
//           if(error)throw error;
//           response.json({resultCode:"cannot delete"})
//         }
//         else{
//           response.json({resultCode:"deleted"})
//         }

//       })
//     }
//   })
// }

module.exports = {
  create_holiday,
  get_holiday,
  get_holidayById,
  update_holiday,
  // delete_holiday
};