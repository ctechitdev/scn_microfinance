const request = require("express/lib/request");
const connected = require('../../../setting/connect');
const queries = require('./user_update_query');

const jwt = require('jsonwebtoken');
 
const secretkey = "CtecMicrofinance";

const update_user = (request, respond) => {

    const { full_name, role,depart, user_status } = request.body;

    console.log(user_id);

        jwt.verify(request.token, secretkey, (err, rtoken)=>{
            if(err){
                respond.status(200).json("token expire");
            }else{

                const id = rtoken.id;

                console.log(id);

                connected.query(queries.update_user,[full_name, role,depart, user_status, id],(error, results)=>{
                
                    if(error) throw error;
                    if(results){
                        respond.status(200).json("ອັບເດດສຳເລັດ");
                    }else{
                        respond.status(200).json("ອັບເດດບໍ່ໄດ້");
                    }
                    
    
                });

            }
        })


            
        }

module.exports = {
    update_user,
}