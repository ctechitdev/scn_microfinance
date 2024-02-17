const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./customer_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

// Create customer
const create_customer = (request, response) => {
  //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
  const {
    profile_picture,
    gender,
    first_name,
    last_name,
    full_name,
    age,
    date_birth,
    customer_nationality,
    customer_job,
    customer_job_location,
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
    customer_status,
    assigned_by,
    add_by,
    customer_user_id,
    add_date,
  } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.get_customerByName,
        [first_name, last_name],
        (error, results) => {
          if (error) throw error;
          const nocustomer = results.length;
          if (nocustomer) {
            if (error) throw error;
            response.json({ resultCode: "ມີ customer ນີ້ແລ້ວ !" });
          } else {
            connected.query(
              queries.add_customer,
              [
                profile_picture,
                gender,
                first_name,
                last_name,
                full_name,
                age,
                date_birth,
                customer_nationality,
                customer_job,
                customer_job_location,
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
                customer_status,
                assigned_by,
                add_by,
                customer_user_id,
                add_date,
              ],
              (error, results) => {
                if (error) throw error;
                response.json({ resultCode: "ເພີ່ມ customer ສຳເລັດ" });
              }
            );
          }
        }
      );
    }
  });
};
// Get all customer fff
const get_customer = (request, response) => {
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(queries.get_customer, (error, results) => {
        if (error) throw error;
        response.json(results);
      });
    }
  });
};
// Get customer by name
const get_customerByName = (request, response) => {
  const { first_name } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(
        queries.get_customerName,
        [first_name],
        (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json(results);
          } else {
            response.json({ resultCode: "ບໍ່ພົບ customer ນີ້ !" });
          }
        }
      );
    }
  });
};

// Get customer by phone
const get_customerByphone = (request, response) => {
  const { phone_number } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(
        queries.get_customerByPhone,
        [phone_number],
        (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json(results);
          } else {
            response.json({ resultCode: "ບໍ່ພົບ customer ນີ້ !" });
          }
        }
      );
    }
  });
};
//update customer
const update_customer = (request, response) => {
  const {
    customer_id,
    profile_picture,
    gender,
    first_name,
    last_name,
    full_name,
    age,
    date_birth,
    customer_nationality,
    customer_job,
    customer_job_location,
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
    add_by,
    customer_user_id,
  } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.get_customerByName,
        [first_name, last_name],
        (error, results) => {
          const customerFound = results.length;
          if (customerFound) {
            if (error) throw error;
            response.json({ resultsCode: "ບໍ່ສາມາດແກ້ໄຂ customer ໄດ້" });
          } else {
            connected.query(
              queries.update_customer,
              [
                customer_id,
                profile_picture,
                gender,
                first_name,
                last_name,
                full_name,
                age,
                date_birth,
                customer_nationality,
                customer_job,
                customer_job_location,
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
                add_by,
                customer_user_id
                
              ],
              (error, results) => {
                if (error) throw error;
                response.json({ resultsCode: "ແກ້ໄຂ customer ສຳເລັດ" });
              }
            );
          }
        }
      );
    }
  });
};
//delete customer
const delete_customer = (request, response) => {
  const { customer_id } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(
        queries.check_loan_request,
        [customer_id],
        (error, results) => {
          if (error) throw error;
          if (results.length) {
            // ຖ້າມີບໍ່ໃຫ້ມັນລົບ
            response.json({ resultCode: "ບໍ່ອະນຸຍາດໃຫ້ລົບ customer ນີ້" });
          } else {
            // connected.query(queries.delete_customer, [customer_id], (error, results) => {
            if (error) {
              response.json({ resultCode: "delete error" });
            } else {
              response.json({ resultCode: "ການລົບ customer ສຳເລັດ" });
            }
            // })
          }
        }
      );
    }
  });
};

module.exports = {
  create_customer,
  get_customer,
  get_customerByName,
  get_customerByphone,
  update_customer,
  delete_customer,
};
