const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./roles_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

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
          response.json({ resultCode: "ມີສິດນີແລ້ວ" })
        } else {
          connected.query(queries.add_roleByname, [role_name], (error, results) => {
            if (error) throw error;
            response.json({ resultCode: "ເພີ່ມສິດສຳເລັດ" })
          })
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
          response.json({ resultCode: "ບໍ່ພົບສິດນີ້ !" });
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
          response.json({ resultsCode: "ບໍ່ສາມາດແກ້ໄຂສີດໄດ້" });
        } else {
          connected.query(queries.update_role, [role_name, role_id], (error, results) => {
            if (error) throw error;
            response.json({ resultsCode: "ແກ້ໄຂສິດສຳເລັດ" });
          })
        }
      });
    }
  });
};

// delete role
const delete_role = (request, response) => {
  const { role_id } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" })
    } else {

      connected.query(queries.check_roleInUser, [role_id], (error, results) => {
        if (error) throw error;
        if (results.length) {
          // ຖ້າມີບໍ່ໃຫ້ມັນລົບ

          response.json({ resultCode: "ບໍ່ອະນຸຍາດໃຫ້ລົບສິດນີ້" })

        } else {

          //ຖ້າບໍ່ມີລະໃຫ້ລົບ
          //response.json({ resultCode: "allow to delete" })
          //ຄຳສັງລົບ
          connected.query(queries.delete_role, [role_id], (error, results) => {
            if (error) {
              response.json({ resultCode: "delete error" })
            } else {
              response.json({ resultCode: "ການລົບສິດສຳເລັດ" })
            }
          })

        }
      })
    }
  });
}





module.exports = {
  create_role,
  get_role,
  get_roleById,
  update_role,
  delete_role,
};