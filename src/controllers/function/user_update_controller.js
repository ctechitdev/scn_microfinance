const request = require("express/lib/request");
const connected = require('../../../setting/connect');
const queries = require('../../queries/function/user_update_query');

const update_user = (request, respond) => {

    const { full_name, role,depart, user_status, user_name } = request.body;


            connected.query(queries.update_user,[full_name, role,depart, user_status, user_name],(error, results)=>{
                
                if(error) throw error;
                if(results){
                    respond.status(200).json("ອັບເດດສຳເລັດ");
                }else{
                    respond.status(200).json("ອັບເດດບໍ່ໄດ້");
                }
                

            });
        }

module.exports = {
    update_user,
}