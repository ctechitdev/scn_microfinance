const request = require("express/lib/request");
const connected = require("../../../../setting/connect");
const queries = require("./register_query");

const register_user = (request, respond) => {

  //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
  const { full_name, user_name, user_password, role, depart, add_by } = request.body;

  // ນຳເອົາ ພາລາມິດເຕີທີໄດ້ ມາກວດໃນສູດ ກວດສອບວ່າຢູສເຊີ້ນີ້ມີແລ້ວບໍ່
  connected.query(queries.check_user, [user_name], (error, results) => {

    //ຖ້າມີຂໍ້ຜິດພາດໃຫ້ໂຢນ ເອີເຣີ້ອອກມາ
    if (error) throw error;

    // ຖ້າມີຂໍ້ມູນໃຫ້ດຳເນີນການ
    if (results.length) {
      
      //ຣີເທີນຂໍ້ຄວາມເປັນ json
      respond.json({ resultCode: "ຜູ້ໃຊ້ນີ້ມີໃນລະບົບແລ້ວ" });
    } else {

      //ຖ້າບໍ່ມີຂໍ້ມູນຢູສເຊີ້ ແມ່ນໃຫ້ດຳເນີນການຟັງຊັ້ນ add user ໂດຍເອົາ ພາລາມິດເຕີ້ທີ່ໄດ້ຈາກ postman
      connected.query( queries.add_user,  [full_name, user_name, user_password, role, depart, add_by], (error, results) => {

          //ຖ້າມີຂໍ້ຜິດພາດໃຫ້ໂຢນ ເອີເຣີ້ອອກມາ
          if (error) throw error;
          
          //ຣີເທີນຂໍ້ຄວາມເປັນ json
          respond.json({ resultCode: "ລົງທະບຽນສຳເລັດ" });
        }
      );
    }
  });
};

module.exports = {
  register_user,
};
