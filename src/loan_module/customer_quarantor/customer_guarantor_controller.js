const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./customer_guarantor_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

const create_customer_guarantor = (request, response) => {
  //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
  const {
    guarantor_profile_picture,
    guarantor_full_name,
    gender,
    age,
    date_birth,
    guarantor_nationality,
    guarantor_job,
    guarantor_job_location,
    province_id,
    district_id,
    village_namge,
    house_unit,
    house_number,
    phone_number,
    whats_app_number,
    house_owner_category,
    live_time_values,
    live_time_type,
    house_owner_status,
    customer_id,
    add_by,
  } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.get_guarantor_customer,
        [guarantor_full_name],
        (error, results) => {
          if (error) throw error;
          const nocustomer = results.length;
          if (nocustomer) {
            if (error) throw error;
            response.json({ resultCode: "ມີ customer guarantor ນີ້ແລ້ວ !" });
          } else {
            connected.query(
              queries.add_guarantor_customer,
              [
                guarantor_profile_picture,
                guarantor_full_name,
                gender,
                age,
                date_birth,
                guarantor_nationality,
                guarantor_job,
                guarantor_job_location,
                province_id,
                district_id,
                village_namge,
                house_unit,
                house_number,
                phone_number,
                whats_app_number,
                house_owner_category,
                live_time_values,
                live_time_type,
                house_owner_status,
                customer_id,
                add_by,
              ],
              (error, results) => {
                if (error) throw error;
                response.json({
                  resultCode: "ເພີ່ມ customer guarantor ສຳເລັດ",
                });
              }
            );
          }
        }
      );
    }
  });
};


const search_customer_guarantor = (request, response) => {
  const {  search_box  } = request.body;

  const search_value = "%"+search_box+"%";

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(  queries.search_customer_guarantor, [ search_value , search_value ],
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


const update_customer_guarantor = (request, response) => {
  const {
    guarantor_profile_picture,
    guarantor_full_name,
    gender,
    age,
    date_birth,
    guarantor_nationality,
    guarantor_job,
    guarantor_job_location,
    province_id,
    district_id,
    village_namge,
    house_unit,
    house_number,
    phone_number,
    whats_app_number,
    house_owner_category,
    live_time_values,
    live_time_type,
    house_owner_status,
    customer_id,
    customer_guarantor_id,
  } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.get_id,
        [customer_guarantor_id],
        (error, results) => {
          if (error) throw error;
          if (!results.length) {
            // ຖ້າມີບໍ່ໃຫ້ມັນແກ້ໄຂ

            response.json({ resultCode: "ບໍ່ອະນຸຍາດໃຫ້ແກ້ໄຂ customer guarantor ນີ້" });
          } else {
                  connected.query(
                    queries.update_customer_guarantor,
                    [
                      guarantor_profile_picture,
                      guarantor_full_name,
                      gender,
                      age,
                      date_birth,
                      guarantor_nationality,
                      guarantor_job,
                      guarantor_job_location,
                      province_id,
                      district_id,
                      village_namge,
                      house_unit,
                      house_number,
                      phone_number,
                      whats_app_number,
                      house_owner_category,
                      live_time_values,
                      live_time_type,
                      house_owner_status,
                      customer_id,
                      customer_guarantor_id,
                    ],
                    (error, results) => {
                      if (error) throw error;
                      response.json({ resultsCode: "ແກ້ໄຂ customer guarantor ສຳເລັດ" });
                    }
                  );
                }
              }
            );
          }
        }
      );
    };
    //delete customer
const delete_customer_guarantor = (request, response) => {
  const { customer_guarantor_id } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.get_id,
        [customer_guarantor_id],
        (error, results) => {
          if (error) throw error;
          if (!results.length) {
            // ຖ້າມີບໍ່ໃຫ້ມັນລົບ
            response.json({ resultCode: "ບໍ່ອະນຸຍາດໃຫ້ລົບ customer guarantor ນີ້" });
          } else {
            connected.query(
              queries.delete_customer_guarantor,
              [customer_guarantor_id],
              (error, results) => {
                if (error) {
                  response.json({ resultCode: "delete error" });
                } else {
                  response.json({ resultCode: "ການລົບ customer guarantor ສຳເລັດ" });
                }
              }
            );
          }
        }
      );
    }
  });
};

module.exports = {
  create_customer_guarantor,
  search_customer_guarantor,
  update_customer_guarantor,
  delete_customer_guarantor
};
