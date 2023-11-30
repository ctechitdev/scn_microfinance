const request = require("express/lib/request");
const connected = require("../../setting/connect");
const queries = require("./login_query");
const { response } = require("express");
const jwt = require("jsonwebtoken");

const secretkey = "CtecMicrofinance";

const login = (request, respond) => {
  const { username, password } = request.body;

  connected.query(queries.login_user,[username, password], (error, results) =>{
    if(error) throw error;
    if(results.length){
        const users = results[0];

        const accessToken = jwt.sign({ id: users.id_user, depart_id: users.depart_id },secretkey);

        respond.json({'resultCode':'OK','id_users' : users.user_id,'depart_id' : users.depart_id,'full_name': users.full_name,'role_id' : users.role_id,accessToken});


    }else{
        respond.json({'resultCode':'Error' });
    }
  })
};

module.exports = {
    login,
  };