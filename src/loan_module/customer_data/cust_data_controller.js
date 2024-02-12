const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./cust_data_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

// Get customer by phone
// const get_customerData = (request, response) => {
//     const {
//         first_name,
//         last_name,
//         age,
//         phone_number,
//         whats_app_number,
//         village_namge,
//         district_id,
//         province_id,
//         picture_identified_name
//      } = request.body;

//     jwt.verify(request.token, secretkey, (token_error, rstoken) => {
//         if (token_error) {
//             response.json({ resultCode: "token error " });
//         } else {
//             connected.query(queries.get_data, [
//                 first_name,
//                 last_name,
//                 age,
//                 phone_number,
//                 whats_app_number,
//                 village_namge,
//                 district_id,
//                 province_id

//             ], (error, results) => {
//                     if (error) throw error;
//                     if (results.length) {
//                         response.json(results);
//                     } else {
//                     }
//                 });
//                 connected.query(queries.get_identified,[picture_identified_name],(error,results)=>{
//                     if (error) throw error;
//                     if (results.length) {
//                         response.json(results);
//                     } else {
//                         response.json({ resultCode: "ບໍ່ພົບ customer ນີ້ !" });
//                     }
//                 })
//         }
//     });
// };
const get_customer_Data = (request, response) => {
    const {
        first_name,
        last_name,
        age,
        phone_number,
        whats_app_number,
        village_namge,
        district_id,
        province_id,
        picture_identified_name
    } = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
        if (token_error) {
            response.json({ resultCode: "token error" })
        } else {

            connected.query(queries.get_data, [
                first_name,
                last_name,
                age,
                phone_number,
                whats_app_number,
                village_namge,
                district_id,
                province_id], (error, results) => {
                    if (error) throw error;
                    if (results.length) {
                        response.json(results);

                    } else {
                        connected.query(queries.get_identified, [picture_identified_name], (error, results) => {
                            if (results.length) {
                                response.json(results);

                            } else {
                                response.json({ resultCode: "search error" })
                            }
                        })

                    }
                })
        }
    });
}

module.exports = {

    get_customer_Data
}
