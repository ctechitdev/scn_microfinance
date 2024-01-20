const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./depart_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";


// Create depart
const create_depart = (request, response) => {
  //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
  const { depart_name } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" })
    } else {
      connected.query(queries.check_departByName, [depart_name], (error, results) => {
        if (error) throw error;
        if (results.length) {
          response.json({ resultCode: "Depart is already exit" })
        } else {
          // connected.query(queries.add_departByname,[depart_name],(error,results)=>{
          //   if(error)throw error;
          response.json({ resultCode: "Add depart successful" })
          // })
        }
      })
    }
  })
}
// get role or read role
const get_depart = (request, response) => {
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(queries.get_depart, (error, results) => {
        if (error) throw error;
        response.json(results);
      })
    }
  })
}
//---get depart by id
const get_departById = (request, response) => {
  const { depart_id } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(queries.get_departById, [depart_id], (error, results) => {
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

// update depart
const update_depart = (request, response) => {
  const { depart_id, depart_name } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" })
    } else {
      connected.query(queries.get_departById, [depart_id], (error, results) => {
        const noDepartFound = !results.length;
        if (noDepartFound) {
          if (error) throw error;
          response.json({ resultsCode: "ບໍ່ສາມາດແກ້ໄຂໄດ້" });
        } else {
          // connected.query(queries.update_depart, [depart_name, depart_id], (error, results) => {
          if (error) throw error;
          response.json({ resultsCode: "ແກ້ໄຂພະແນກສຳເລັດ" });
          // })
        }
      });
    }
  });
};

// // delete depart
// const delete_depart = (request, response)=>{
//   const {depart_id} = request.body;
//   jwt.verify(request.token, secretkey, (token_error, rstoken) => {
//     if (token_error) {
//       response.json({ resultCode: "token error" })
//     }else{
//       connected.query(queries.get_departById, [depart_id], (error, results) => {
//         const checkDepartInUser = queries.check_departInUser;
//         const { checkDepartInUserdepart} = results[0];
//         if (checkDepartInUserdepart){
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
  create_depart,
  get_depart,
  get_departById,
  update_depart,
  // delete_depart,
};
