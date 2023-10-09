const request = require("express/lib/request");

const connected = require('../../../setting/connect');

const queries = require('../../queries/function/login_query');

const login = (request , respond) => {

    
  
  connected.query(queries.login_user, (error, results) => {
    if(error) throw error;

      
  //  console.log(results);

    respond.status(200).json(results);

  });
};

module.exports = {
  login,
};
