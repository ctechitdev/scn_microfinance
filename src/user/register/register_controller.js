const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./register_query");

const bcrypt = require('bcrypt');

const register_user = async(request, respond) => {
 
  const { full_name, user_name, role, depart, add_by } = request.body;

  const encryptPassword = await bcrypt.hash("123",10);
 
  connected.query(queries.check_user, [user_name], (error, results) => {
 
    if (error) throw error;
 
    if (results.length) {
       
      respond.json({ resultCode: "ຜູ້ໃຊ້ນີ້ມີໃນລະບົບແລ້ວ" });
    } else {
 
      connected.query( queries.add_user,  [full_name, user_name, encryptPassword, role, depart, add_by], (error, results) => {
 
          if (error) throw error;
           
          respond.json({ resultCode: "ລົງທະບຽນສຳເລັດ" });
        }
      );
    }
  });
};

module.exports = {
  register_user,
};
