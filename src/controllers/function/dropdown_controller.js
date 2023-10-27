const request = require("express/lib/request");
const connected = require('../../../setting/connect');
const queries = require('../../queries/function/dropdown_query');

const jwt = require('jsonwebtoken');
 
const secretkey = "CtecMicrofinance";


//show depart
const show_depart = (request, respond) => {


        jwt.verify(request.token, secretkey, (err, rtoken)=>{
            if(err){
                respond.status(200).json("token expire");
            }else{

                connected.query(queries.show_depart,(error, results)=>{
                
                    if(error) throw error;
                    if(results){
                
                        respond.json({resualt_code:'ok',
                        depart_id : results[0].depart_id,
                        depart_name : results[0].depart_name

                    })
                        

                    }else{
                        respond.status(200).json("ບໍ່ພົບຂໍ້ມູນ");
                    }
                    
    
                });

            }
        })
}


//show provice
const show_provice = (request, respond) => {


    jwt.verify(request.token, secretkey, (err, rtoken)=>{
        if(err){
            respond.status(200).json("token expire");
        }else{

            connected.query(queries.show_provice,(error, results)=>{
            
                if(error) throw error;
                if(results){
                    respond.status(200).json(results);
                }else{
                    respond.status(200).json("ບໍ່ພົບຂໍ້ມູນ");
                }
                

            });

        }
    })
}


//show distric
const show_distric = (request, respond) => {

    const { pro_id } = request.body;

    console.log(pro_id);

    jwt.verify(request.token, secretkey, (err, rtoken)=>{
        if(err){
            respond.status(200).json("token expire");
        }else{

            connected.query(queries.show_disctic,[pro_id],(error, results)=>{
            
                if(error) throw error;
                if(results){
                    
                    //respond.json(results);
                   

                    respond.end(JSON.stringify(results, null, 2));
                }else{
                    respond.status(200).json("ບໍ່ພົບຂໍ້ມູນ");
                }
                

            });

        }
    })
}

module.exports = {
    show_depart,
    show_provice,
    show_distric
}