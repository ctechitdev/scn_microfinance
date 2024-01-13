const request = require("express/lib/request");
const connected = require("../../setting/connect");
const queries = require("./holiday_query");

// Create holiday
const create_holiday = (request, respond) => {

  //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
  const { holiday_category_id,holiday_name, holiday_date} = request.body;

  // ນຳເອົາ ພາລາມິດເຕີທີໄດ້ ມາກວດໃນສູດ ກວດສອບວ່າຢູສເຊີ້ນີ້ມີແລ້ວບໍ່
  connected.query(queries.check_holidayByName, [holiday_category_id,holiday_name, holiday_date], (error, results) => {

    //ຖ້າມີຂໍ້ຜິດພາດໃຫ້ໂຢນ ເອີເຣີ້ອອກມາ
    if (error) throw error;
    // ຖ້າມີຂໍ້ມູນໃຫ້ດຳເນີນການ
    if (results.length) {
      //ຣີເທີນຂໍ້ຄວາມເປັນ json
      respond.json({ resultCode: "ວັນພັກນີ້ມີໃນລະບົົບແລ້ວ !" });
    } else {
      //ຖ້າບໍ່ມີຂໍ້ມູນຢູສເຊີ້ ແມ່ນໃຫ້ດຳເນີນການຟັງຊັ້ນ add user ໂດຍເອົາ ພາລາມິດເຕີ້ທີ່ໄດ້ຈາກ postman
      connected.query(queries.add_holidayByname, [holiday_category_id,holiday_name, holiday_date], (error, results) => {
        //ຖ້າມີຂໍ້ຜິດພາດໃຫ້ໂຢນ ເອີເຣີ້ອອກມາ
        if (error) throw error;
        //ຣີເທີນຂໍ້ຄວາມເປັນ json
        respond.json({ resultCode: "ເພີ່ມວັນພັກສຳເລັດ" });
      }
      );
    }
  });
};

// get holiday or read holiday
const get_holiday = (request, response) => {
  connected.query(queries.get_holiday, (error, results) => {
    if (error) throw error;
    response.json(results);
  })
}
//---get holiday by id
const get_holidayById = (request, response) => {
  const { holiday_id } = request.body;
  connected.query(queries.get_holidayById, [holiday_id], (error, results) => {
    if (error) throw error;

    // if there are data inside 
    if (results.length) {

      //Return the json message
      response.json(results);
      //if undefind show the json message
    } else {
      response.json({ resultCode: "ບໍ່ພົບວັນພັກນີ້ !" });
    }
  })

}

// update holiday
const update_holiday = (request, response) => {
  const { holiday_id, holiday_category_id,holiday_name,holiday_date} = request.body;
  connected.query(queries.get_holidayById, [holiday_id], (error, results) => {
    const noholidayFound = !results.length;
    if (noholidayFound) {
      if (error) throw error;
      response.json({ resultsCode: "ບໍ່ສາມາດແກ້ໄຂໄດ້" });
    }
    connected.query(queries.update_holiday, [ holiday_id,holiday_category_id,holiday_name,holiday_date], (error, results) => {
      if (error) throw error;
      response.json({ resultsCode: "ແກ້ໄຂວັນພັກສຳເລັດ" });
    })
  })

}

// delete holiday
const delete_holiday = (request, response) => {
  const { holiday_id } = request.body;
  connected.query(queries.get_holidayById, [holiday_id], (error, results) => {
      if (!results.length) {
          if (error) throw error;
          response.json({ resultCode: "ບໍ່ສາມາດລົບວັນພັກໄດ້" });
      }
      else {
          connected.query(queries.delete_holiday, [holiday_id], (error, results) => {
              if (error) throw error;
              response.json({ resultCode: "ລົບວັນພັກສຳເລັດ" });
          });
      }

  })
}

module.exports = {
  create_holiday,
  get_holiday,
  get_holidayById,
  update_holiday,
  delete_holiday
};