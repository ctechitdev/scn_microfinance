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
          response.json({ resultCode: "ມີພະແນກນີ້ແລ້ວ !" })
        } else {
          connected.query(queries.add_departByname,[depart_name],(error,results)=>{
            if(error)throw error;
          response.json({ resultCode: "ເພີ່ມພະແນກສຳເລັດ" })
          })
        }
      })
    }
  })
}
// get depart or read depart
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

const get_depart_notoken = (request, response) => { 
  connected.query(queries.get_depart, (error, results) => {
    if (error) throw error;
    response.json(results);
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
        if (results.length) {
          response.json(results[0]);
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
        const NotFound = !results.length;
        if (NotFound) {
          if (error) throw error;
          response.json({ resultsCode: "ບໍ່ສາມາດແກ້ໄຂພະແນກໄດ້" });
        } else {
          connected.query(queries.update_depart, [depart_name, depart_id], (error, results) => {
          if (error) throw error;
          response.json({ resultsCode: "ແກ້ໄຂພະແນກສຳເລັດ" });
          })
        }
      });
    }
  });
};

// delete depart
const delete_depart = (request, response) => {
  const { depart_id } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" })
    } else {

      connected.query(queries.check_departInUser, [depart_id], (error, results) => {
        if (error) throw error;
        if (results.length) {
          // ຖ້າມີບໍ່ໃຫ້ມັນລົບ

          response.json({ resultCode: "ບໍ່ອະນຸຍາດໃຫ້ລົບພະແນກນີ້" })

        } else {

          //ຖ້າບໍ່ມີລະໃຫ້ລົບ
          //response.json({ resultCode: "allow to delete" })
          //ຄຳສັງລົບ
          connected.query(queries.delete_depart, [depart_id], (error, results) => {
            if (error) {
              response.json({ resultCode: "delete error" })
            } else {
              response.json({ resultCode: "ການລົບພະແນກສຳເລັດ" })
            }
          })

        }
      })
    }
  });
}




module.exports = {
  create_depart,
  get_depart,
  get_departById,
  update_depart,
  delete_depart,
  get_depart_notoken,
};
