const request = require("express/lib/request");
const connected = require("../../setting/connect");
const queries = require("./holiday_category_query");

// Create depart
const create_holidaycate = (request, response) => {

    const { holiday_category_name } = request.body;

    connected.query(queries.check_holiday_cateByName, [holiday_category_name], (error, results) => {

        if (error) throw error;
        if (results.length) {
            response.json({ resultCode: "ປະເພດວັນພັກນີ້ມີໃນລະບົົບແລ້ວ !" });
        } else {
            connected.query(queries.add_holiday_cateByname, [holiday_category_name], (error, results) => {
                if (error) throw error;
                response.json({ resultCode: "ເພີ່ມປະເພດວັນພັກສຳເລັດ" });
            }
            );
        }
    });
};

// get holiday_category or read holiday_category
const get_holidaycate = (request, response) => {
    connected.query(queries.get_holiday_cate, (error, results) => {
        if (error) throw error;
        response.json(results);
    })
}
//---get holiday_category by id
const get_holidaycateById = (request, response) => {
    const { holiday_category_id } = request.body;
    connected.query(queries.get_holiday_cateById, [holiday_category_id], (error, results) => {
        if (error) throw error;
        // if there are data inside 
        if (results.length) {

            //Return the json message
            response.json(results);
            //if undefind show the json message
        } else {
            if (error) throw error;
            response.json({ resultCode: "ບໍ່ພົບປະເພດວັນພັກນີ້ !" });
        }
    })

}

// update holiday_category
const update_holidaycate = (request, response) => {
    const { holiday_category_id, holiday_category_name } = request.body;
    connected.query(queries.get_holiday_cateById, [holiday_category_id], (error, results) => {
        const noHolidayCateFound = !results.length;
        if (noHolidayCateFound) {
            if (error) throw error;
            response.json({ resultCode: " ບໍ່ສາມາດແກ້ໄຂປະເພດວັນພັກໄດ້" });
        }
        connected.query(queries.update_holiday_cate, [holiday_category_name, holiday_category_id], (error, results) => {
            if (error) throw error;
            response.json({ resultCode: "ແກ້ໄຂປະເພດວັນພັກສຳເລັດ" });
        })
    })

}

// delete holiday category
// fix it //
const delete_holidaycate =(request, response) => {
    const { holiday_category_id } = request.body;
    connected.query(queries.get_holiday_cateById, [holiday_category_id], (error, results) => {
        const checkHolcate = queries.check_holiday_cateInHoliday ;
        if (checkHolcate) {
            if (error) throw error;
            response.json({ resultCode: "fail to delete"});
        }
        else {
            connected.query(queries.delete_holiday_cate, [holiday_category_id], (error, results) => {
                if (error) throw error;
                response.json({ resultCode: "success" });
            });
        }
  
    })
  }

module.exports = {
    create_holidaycate,
    get_holidaycate,
    get_holidaycateById,
    update_holidaycate,
    delete_holidaycate,
};