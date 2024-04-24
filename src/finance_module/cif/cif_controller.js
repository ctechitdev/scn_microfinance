const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./cif_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

// search customer for adding into the cif
const search_customer_add_cif = (request, response) => {
  const { search_box } = request.body;

  const search_value = "%" + search_box + "%";

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.search_cutomer_as_cif,
        [search_value, search_value],
        (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json(results);
          } else {
            response.json({ resultCode: "search error" });
          }
        }
      );
    }
  });
};
// Create cif
const create_cif = (request, response) => {
    //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
    const {
      customer_id, CIF_SCN_status

    } = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" });
      } else {
        connected.query(
          queries.get_customer_id,
          [customer_id],
          (error, results) => {
            if (error) throw error;
            if (results.length) {
              response.json({ resultCode: "ມີເລກທະບຽນນີ້ແລ້ວ !" });
            } else {
              connected.query(
                queries.add_cif,
                [
                  customer_id, CIF_SCN_status
                ],
                (error, results) => {
                  if (error) throw error;
                  response.json({ resultCode: "ເພີ່ມເລກທະບຽນສຳເລັດ" });
                }
              );
            }
          }
        );
      }
    });
};

// get CIF
const get_cif = (request, response) => {
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(queries.get_cif, (error, results) => {
        if (error) throw error;
        response.json(results);
      })
    }
  })
}

//---get depart by id
const get_cif_ById = (request, response) => {
  const { CIF_SCN_id } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(queries.get_cif_id, [CIF_SCN_id], (error, results) => {
        if (error) throw error;
        if (results.length) {
          response.json(results[0]);
        } else {
          response.json({ resultCode: "ບໍ່ພົບ cif ນີ້ !" });
        }
      });
    }
  });
};

//  const update_cif = (request, response) => {
//   const { customer_id,CIF_SCN_id} = request.body;
//   jwt.verify(request.token, secretkey, (token_error, rstoken) => {
//     if (token_error) {
//       response.json({ resultCode: "token error" })
//     } else {

//       connected.query(queries.get_customerById, [customer_id], (error, results) => {
//         if (error) throw error;
//         if (!results.length) {
//           // ຖ້າມີບໍ່ໃຫ້ມັນແກ້ໄຂ
//           response.json({ resultCode: "ມີ CIF ນີ້ຢູ່ແລ້ວ" })


//         } else {

//           //ຖ້າບໍ່ມີລະໃຫ້ແກ້ໄຂ
//           //response.json({ resultCode: "allow to update" })
//           //ຄຳສັງແກ້ໄຂ
//           connected.query(queries.check_cif_id_in_account, [CIF_SCN_id], (error, results) => {
//             if (results.length) {

//               response.json({ resultCode: "ບໍ່ອະນຸຍາດໃຫ້ແກ້ໄຂ CIF ນີ້" })
//             } else {
//               connected.query(queries.update_cif, [customer_id,CIF_SCN_id], (error, results) => {
//                 if (error) throw error;
//                 response.json({ resultsCode: "ແກ້ໄຂ CIF ສຳເລັດ" });
//                 })
//             }
//           })

//         }
//       })
//     }
//   });
// }

module.exports = {
  search_customer_add_cif,
  create_cif,
  get_cif,
  get_cif_ById,
  // update_cif
};
