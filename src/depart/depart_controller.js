const request = require("express/lib/request");
const connected = require("../../setting/connect");
const queries = require("./depart_query");
const { response } = require("express");

// Create depart
const create_depart = (request, respond) => {

  //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
  const { depart_name } = request.body;

  // ນຳເອົາ ພາລາມິດເຕີທີໄດ້ ມາກວດໃນສູດ ກວດສອບວ່າຢູສເຊີ້ນີ້ມີແລ້ວບໍ່
  connected.query(queries.check_departByName, [depart_name], (error, results) => {

    //ຖ້າມີຂໍ້ຜິດພາດໃຫ້ໂຢນ ເອີເຣີ້ອອກມາ
    if (error) throw error;
    // ຖ້າມີຂໍ້ມູນໃຫ້ດຳເນີນການ
    if (results.length) {
      //ຣີເທີນຂໍ້ຄວາມເປັນ json
      respond.json({ resultCode: "ພະແນກນີ້ມີໃນລະບົົບແລ້ວ !" });
    } else {
      //ຖ້າບໍ່ມີຂໍ້ມູນຢູສເຊີ້ ແມ່ນໃຫ້ດຳເນີນການຟັງຊັ້ນ add user ໂດຍເອົາ ພາລາມິດເຕີ້ທີ່ໄດ້ຈາກ postman
      connected.query(queries.add_departByname, [depart_name], (error, results) => {
        //ຖ້າມີຂໍ້ຜິດພາດໃຫ້ໂຢນ ເອີເຣີ້ອອກມາ
        if (error) throw error;
        //ຣີເທີນຂໍ້ຄວາມເປັນ json
        respond.json({ resultCode: "ເພີ່ມພະແນກສຳເລັດ" });
      }
      );
    }
  });
};

// get depart or read depart
const get_depart = (request, response) => {
  connected.query(queries.get_depart, (error, results) => {
    if (error) throw error;
    response.json(results);
  })
}
//---get depart by id
const get_departById = (request, response) => {
  const { depart_id } = request.body;
  connected.query(queries.get_departById, [depart_id], (error, results) => {
    if (error) throw error;

    // if there are data inside 
    if (results.length) {

      //Return the json message
      response.json(results);
      //if undefind show the json message
    } else {
      response.json({ resultCode: "ບໍ່ພົບພະແນກນີ້ !" });
    }
  })

}

// update depart
const update_depart = (request, response) => {
  const { depart_id, depart_name} = request.body;
  connected.query(queries.get_departById, [depart_id], (error, results) =>{
    const noPeopleFound = !results.length;
        if (noPeopleFound) {
          response.json({ resultCode: "ບໍ່ພົບພະແນກ ບໍ່ສາມາດແກ້ໄຂໄດ້" });
        }
        connected.query(queries.update_depart, [depart_name,depart_id], (error, results)=>{
          if(error) throw error;
          response.json({ resultCode: "ແກ້ໄຂພະແນກສຳເລັດ" });
        })
  })

}

// delete depart 
// ແກ້ໂຕນິ

const delete_depart = (request, response) => {
  const { depart_id} = request.body;
  connected.query(queries.get_departById, [depart_id], (error, results) =>{
    const noPeopleFound = !results.length;
        if (noPeopleFound) {
          response.json({ resultCode: "ບໍ່ພົບພະແນກ ບໍ່ສາມາດລົບໄດ້" });
        }
        connected.query(queries.delete_depart, [depart_id], (error, results)=>{
          if(error) throw error;
          response.json({ resultCode: "ລົບພະແນກສຳເລັດ" });
        })
  })

}






module.exports = {
  create_depart,
  get_depart,
  get_departById,
  update_depart,
  delete_depart
};