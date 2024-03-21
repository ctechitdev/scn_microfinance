const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./sub_header_query");


const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

// Create depart
const create_sub_header = (request, response) => {
    //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
    const { sub_header_name, icon_code, header_title_id } = request.body;
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
        connected.query(queries.get_sub_header_name, [sub_header_name], (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json({ resultCode: "ມີ sub_header ນີ້ແລ້ວ !" })
          } else {
            connected.query(queries.add_sub_header,[sub_header_name, icon_code, header_title_id],(error,results)=>{
              if(error)throw error;
            response.json({ resultCode: "ເພີ່ມ sub_header ສຳເລັດ" })
            })
          }
        })
      }
    })
  }

  

module.exports={
    create_sub_header,

};