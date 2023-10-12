const request = require("express/lib/request");
const connected = require('../../../setting/connect');
const queries = require('../../queries/function/login_query');

const login = (request , respond) => {

  const { username, password } = request.body;

  console.log(username);


  connected.query(queries.login_user,[username, password], (error, results) => {
    if(error) throw error;

    if(results.length){
      const users = results[0];
 //  console.log(results);

    respond.status(200).json(users);

    }else{

      respond.status(200).send("ໍຊື່ຜູ້ໃຊ້ຫຼືລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ");

    }

  });
};

module.exports = {
  login,
};