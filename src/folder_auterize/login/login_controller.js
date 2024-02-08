const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./login_query");
const { response } = require("express");
const jwt = require("jsonwebtoken");

const secretkey = "CtecMicrofinance";

const login = (request, respond) => {
  const { username, password } = request.body;

// ກວດ ຂໍ້ມູນ ຢູສເຊີ້ວ່າມີຈິງບໍ່
  connected.query(queries.login_user,[username, password], (error, results) =>{

    //ຖ້າມີຂໍ້ຜິດພາດໃຫ້ໂຢນ ເອີເຣີ້ອອກມາ
    if(error) throw error;

    // ຖ້າມີຂໍ້ມູນໃຫ້ດຳເນີນການ
    if(results.length){

        //ເກັບຄ່າທີ່ດຶງອອກມາໂດຍເອົາແຖວທຳອິດ ຫຼື index ທີ່ 0 (ອັນທີ່1)
        const users = results[0];

        // ເກັບຂໍ້ມູນໄວ້ໃນໂຕແປ accToken ໂດຍ ເອົາຄ່າທີ່ ນຳໃຊຟັງຊັ້ນ ເຈສັນເວັບໂທເຄັນ ມາເກັບໄວ
        const accessToken = jwt.sign({ id: users.id_user, depart_id: users.depart_id },secretkey);

        //ຣີເທີນຂໍ້ມູນອອກເປັນ ເຈສັນ
        respond.json({'resultCode':'OK','id_users' : users.user_id,'depart_id' : users.depart_id,'full_name': users.full_name,'role_id' : users.role_id,accessToken});


        // ຖ້າບໍ່ມີຂໍ້ມູນໃຫ້ໂຍນຂໍ້ມູນອອກມາ   
    }else{
    
      //ຣີເທີນຂໍ້ມູນເປັນ ເຈສັນ
        respond.json({'resultCode':'Error' });
    }
  })
};

module.exports = {
    login,
  };