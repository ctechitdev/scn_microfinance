const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./roles_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

// Create role
// Create role
const create_role = (request, response) => {
    //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
    const { role_name } = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
        connected.query(queries.check_roleByName, [role_name], (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json({ resultCode: "role is already exit" })
          } else {
            // connected.query(queries.add_roleByname,[role_name],(error,results)=>{
            //   if(error)throw error;
            response.json({ resultCode: "Add role successful" })
            // })
          }
        })
      }
    })
  }
  // get role or read role
  const get_role = (request, response) => {
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error " });
      } else {
        connected.query(queries.get_role, (error, results) => {
          if (error) throw error;
          response.json(results);
        })
      }
    })
  }
  //---get role by id
  const get_roleById = (request, response) => {
    const { role_id } = request.body;
  
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error " });
      } else {
        connected.query(queries.get_roleById, [role_id], (error, results) => {
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
  
  // update role
  const update_role = (request, response) => {
    const { role_id, role_name } = request.body;
  
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
        connected.query(queries.get_roleById, [role_id], (error, results) => {
          const noroleFound = !results.length;
          if (noroleFound) {
            if (error) throw error;
            response.json({ resultsCode: "ບໍ່ສາມາດແກ້ໄຂໄດ້" });
          } else {
            // connected.query(queries.update_role, [role_name, role_id], (error, results) => {
            if (error) throw error;
            response.json({ resultsCode: "ແກ້ໄຂພະແນກສຳເລັດ" });
            // })
          }
        });
      }
    });
  };

// delete role
const delete_role = (request, response) => {
  const {role_id} = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" })
    }else{
      connected.query(queries.get_roleById, [role_id], (error, results) =>{
        const checkUserInrole = queries.check_roleInUser;
        if(checkUserInrole){
          if (error)throw error;
          response.json({ resultCode: "ບໍ່ສາມາດລົບສິດໄດ້" });
        }else{
          if(error)throw error;
          response.json({ resultCode: "ລົບສິດສຳເລັດ" });
        }
      })
    }
})
}
 




module.exports = {
    create_role,
    get_role,
    get_roleById,
    update_role,
    delete_role,
};