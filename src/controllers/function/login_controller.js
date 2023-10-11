const request = require("express/lib/request");

const connected = require('../../../setting/connect');

const queries = require('../../queries/function/login_query');
const { response } = require("express");

const login = (request , respond) => {

    const { username, password } = request.body;


    console.log(username);
    console.log(password);
  
  connected.query(queries.login_user,[username, password], (error, results) => {
    if(error) throw error;

    if(results.length){
      respond.status(200).json(results);
    }else{
      respond.status(200).send("ຊື່ຜູ້ໃຊ້ຫຼືລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ");
    }   
  //  console.log(results);

    

  });
};

module.exports = {
  login,
};
