const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./asset_type_cust_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";

// Create asset_type
const create_asset_type = (request, response) => {
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
  const get_asset_type = (request, response) => {
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error " });
      } else {
        connected.query(queries.get_all_assetType, (error, results) => {
          if (error) throw error;
          response.json(results);
        })
      }
    })
  }
  //---get asset by id
const get_asset_TypeById = (request, response) => {
    const { asset_type_customer_id } = request.body;
  
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error " });
      } else {
        connected.query(queries.get_asset_TypeById, [asset_type_customer_id], (error, results) => {
          if (error) throw error;
          if (results.length) {
            response.json(results);
          } else {
            response.json({ resultCode: "ບໍ່ປະເພດຊັບສິນນີ້ !" });
          }
        });
      }
    });
  };


  // ແກ້ໂຕນີ້ຕື່ມ ໃຫ້ກວດສອບຖ້າຊື່ຊ້ຳບໍ່ສາມາດແກ້ໄຂໄດ້
  const update_asset_type = (request, response) => {
    const { asset_type_customer_id, asset_type_customer_name } = request.body;
  
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" })
      } else {
        connected.query(queries.get_asset_TypeById, [asset_type_customer_id], (error, results) => {
          const noasset_Type = !results.length;

          if (noasset_Type) {
            if (error) throw error;
            response.json({ resultsCode: "ບໍ່ສາມາດແກ້ໄຂ asset type customer ໄດ້" });
          }else {
            connected.query(queries.update_asset_type, [asset_type_customer_name, asset_type_customer_id],(error, results)=>{
                const checkName = queries.check_assetByName;
                if(error){
                    if (error) throw error;
                    response.json({ resultsCode: "update error" });
                  }else{
                    if (error) throw error;
                    response.json({ resultsCode: "ແກ້ໄຂ asset type customer ສຳເລັດ" });
                  }

            })
          }
        });
      }
    });
  };



module.exports = {
    create_asset_type,
    get_asset_type,
    get_asset_TypeById,
    update_asset_type
  };