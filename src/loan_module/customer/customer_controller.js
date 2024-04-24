const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./customer_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";


// Create customer

const add_customer = (request, response) => {
  const {
    profile_picture,
    gender,
    first_name,
    last_name,
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
    customer_status
  } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "Token error" });
    } else {
      connected.query(
        queries.get_customerByName,
        [first_name, last_name],
        (error, results) => {
          if (results.length) {
            response.json({ resultCode: "Customer already exists" });
          } else {
              connected.query(queries.add,
                [
                  profile_picture,
                  gender,
                  first_name,
                  last_name,
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
                  customer_status
                ],
                (error, results) => {
                  if (error) {
                    response.json({ resultCode:"database1 error" });
                  } else {
                    console.log('Inserted new customer with customer_id:', results.insertId);
                    // Assuming queries.add_2 and request.body are defined properly
                    const{                        
                  
                      picture_identified_name,
                      picture_name_file,
                      identified_register_date,
                      identified_expire_date,
                      picture_identified_type
                    }=request.body;
                    connected.query(
                      queries.add_2,
                      [
                        results.insertId,
                       picture_identified_name,
                       picture_name_file,
                       identified_register_date,
                       identified_expire_date,
                       picture_identified_type
                      ],
                      (error, results) => {
                        if (error) {
                          response.json({ error: "Database3 error" });
                        } else {
                          console.log('Inserted new address with ID:', results.insertId);
                          response.json({ success: true, message: "Customer added successfully" });
                        }
                      }
                    );
                  }
                }
              );
            
          }
        }
      );
    }
  });
};

const search_customer = (request, response) => {
  const {  search_box  } = request.body;

  const search_value = "%"+search_box+"%";

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" });
    } else {
      connected.query(  queries.search_customer, [ search_value , search_value ],
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
// Get all customer
const get_customer = (request, response) => {
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(queries.get_customer, (error, results) => {
        if (error) throw error;
        response.json(results);
      })
    }
  })
}

//update customer
const update_customer = (request, response) => {
  const {
    customer_id,
    profile_picture,
    gender,
    first_name,
    last_name,
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
          const FoundCustomer = results.length;
          if (FoundCustomer) {
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
                customer_user_id,
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
        queries.check_loan_request, //select * from tbl_loan_request where customer_id=?
        [customer_id],
        (error, results) => {
          if (error) throw error;
          if (results.length) {
            // ຖ້າມີບໍ່ໃຫ້ມັນລົບ
            response.json({ resultCode: "ບໍ່ອະນຸຍາດໃຫ້ລົບ customer ນີ້" });
          } else {
            connected.query(
              queries.delete_customer,
              [customer_id],
              (error, results) => {
                if (error) {
                  response.json({ resultCode: "delete error" });
                } else {
                  response.json({ resultCode: "ການລົບ customer ສຳເລັດ" });
                }
              }
            );
          }
        }
      );
    }
  });
};

//update assign ໃຊ້ສຳລັບການກົດຮັບລູກຄ້າ

const update_assigned = (request, response) => {
  const {     
    assigned_by,
    customer_id
  } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" })
    } else {
      connected.query(queries.get_customerById, [customer_id], (error, results) => {
        const NotFound = !results.length;
        if (NotFound) {
          if (error) throw error;
          response.json({ resultsCode: "ບໍ່ສາມາດແກ້ໄຂ customer assignment ໄດ້" });
        } else {
          connected.query(queries.update_assigned, [    
            assigned_by,
            customer_id], (error, results) => {
          if (error) throw error;
          response.json({ resultsCode: "ແກ້ໄຂ customer assignment ສຳເລັດ" });
          })
        }
      });
    }
  });
};

// Get customer by name
const get_customer_id = (request, response) => {
  const { customer_id } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(queries.get_customer_id, [customer_id], (error, results) => {
        if (error) throw error;
        if (results.length) {
          response.json(results[0]);
        } else {
          response.json({ resultCode: "ບໍ່ພົບ customer ນີ້ !" });
        }
      });
    }
  });
};

module.exports = {
  search_customer,
  update_customer,
  delete_customer,
  update_assigned,
  get_customer,
  get_customer_id,
  add_customer
};
