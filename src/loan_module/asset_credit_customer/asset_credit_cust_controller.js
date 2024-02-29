const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./asset_credit_cust_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

// Create asset_type
const create_asset_credit = (request, response) => {
    //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
    const {
      asset_type_customer_name, 
      asset_detail, 
      asset_credit_values,
      limit_credit_values,
      currency,
      asset_status,
      customer_id,
      add_by,
      evaluate_by,
      evaluate_date,
      guarantee_picture,
      location_point
    } = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
        connected.query(queries.add_asset_credit, [
          asset_type_customer_name, 
          asset_detail, 
          asset_credit_values,
          limit_credit_values,
          currency,
          asset_status,
          customer_id,
          add_by,
          evaluate_by,
          evaluate_date,
          guarantee_picture,
          location_point], (error, results) => {
          if (error){
            response.json({ resultCode: "add error!" })
          }else{
            response.json({ resultCode: " ເພີ່ມສຳເລັດ" })
          }

        })
      }
    })
  }


module.exports={
    create_asset_credit
}