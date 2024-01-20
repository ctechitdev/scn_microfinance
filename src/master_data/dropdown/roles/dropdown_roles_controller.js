const request = require("express/lib/request");
const connected = require("../../../../setting/connect");
const queries = require("./dropdown_roles_query");

const jwt = require('jsonwebtoken');
const { response } = require("express");
const { result } = require("@hapi/joi/lib/base");

const secretkey = "CtecMicrofinance";



// show roles
const drop_down_roles = (request, respond) =>{
    jwt.verify(request.token, secretkey, (error, rtoken) =>{
        if(error){
            respond.status(200).json("token expire");
        }else{
            connected.query(queries.show_roles, (error, results) =>{
                if(error) throw error;
                if(results){
                    respond.status(200).json({result_code:'ok', data_role: results});
                }else{
                    respond.status(200).json("ບໍ່ພົບຂໍ້ມູນ");
                }
            })
        }
    })
}

module.exports={
    drop_down_roles
}