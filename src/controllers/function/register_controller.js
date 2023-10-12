const request = require("express/lib/request");
const connected = require('../../../setting/connect');
const queries = require('../../queries/function/register_query');

const register_user = (request, respond) => {

    const { full_name, user_name, user_password, role,depart, add_by } = request.body;

    connected.query(queries.check_user, [user_name], (error, results) => {
        if(error) throw error; 
        if (results.length) {

            respond.send("ຜູ້ໃຊ້ນີ້ມີໃນລະບົບແລ້ວ");

        }else{

            connected.query(queries.add_user,[full_name, user_name, user_password, role,depart, add_by],(error, results)=>{
                
                if(error) throw error;
                respond.send("ລົງທະບຽນສຳເລັດ");

            });
        }
    });

}

module.exports = {
    register_user,
}