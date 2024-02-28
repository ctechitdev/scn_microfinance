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
    const { asset_type_customer_name } = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
        connected.query(queries.check_assetByName, [asset_type_customer_name], (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json({ resultCode: "ມີປະເພດຊັບສິນນີ້ແລ້ວ !" })
          } else {
            connected.query(queries.add_assetByName,[asset_type_customer_name],(error,results)=>{
              if(error)throw error;
            response.json({ resultCode: "ເພີ່ມປະເພດຊັບສິນສຳເລັດ" })
            })
          }
        })
      }
    })
  }


module.exports={
    create_asset_credit
}