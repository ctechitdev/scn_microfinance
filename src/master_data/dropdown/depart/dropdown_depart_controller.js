const request = require("express/lib/request");
const connected = require("../../../../setting/connect");
const queries = require("./dropdown_depart_query");

const jwt = require('jsonwebtoken');
const { response } = require("express");
const { result } = require("@hapi/joi/lib/base");

const secretkey = "CtecMicrofinance";


//show depart
const drop_down_depart = (request, respond) => {


    jwt.verify(request.token, secretkey, (err, rtoken) => {
        if (err) {
            respond.status(200).json("token expire");
        } else {
            connected.query(queries.show_depart, (error, results) => {

                if (error) throw error;
                if (results) {

                    respond.status(200).json({ resualt_code: 'ok', data_depart: results });
                } else {
                    respond.status(200).json("ບໍ່ພົບຂໍ້ມູນ");
                }
            });

        }
    })
}


//show provice
const show_provice = (request, respond) => {


    jwt.verify(request.token, secretkey, (err, rtoken) => {
        if (err) {
            respond.status(200).json("token expire");
        } else {

            connected.query(queries.show_provice, (error, results) => {

                if (error) throw error;
                if (results) {
                    respond.status(200).json(results);
                } else {
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

    jwt.verify(request.token, secretkey, (err, rtoken) => {
        if (err) {
            respond.status(200).json("token expire");
        } else {

            connected.query(queries.show_disctic, [pro_id], (error, results) => {

                if (error) throw error;
                if (results) {

                    //respond.json(results);


                    respond.end(JSON.stringify(results, null, 2));
                } else {
                    respond.status(200).json("ບໍ່ພົບຂໍ້ມູນ");
                }


            });

        }
    })
}



module.exports = {
    drop_down_depart,
    show_provice,
    show_distric
}