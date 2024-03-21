//call express function
const { Router } = require('express');
//set router
const router = Router();



 
// depart
const depart_controller = require("../master_data_module/depart/depart_controller")
router.post('/depart/add', verifyToken,depart_controller.create_depart)
router.post('/depart/get', verifyToken,depart_controller.get_depart)
router.post('/depart/id',verifyToken, depart_controller.get_departById)
router.put('/depart/update',verifyToken, depart_controller.update_depart)
router.delete('/depart/delete',verifyToken, depart_controller.delete_depart)

//holiday
const holiday_controller = require("../master_data_module/holiday/holiday_controller")
router.post('/holiday/add',verifyToken, holiday_controller.create_holiday)
router.post('/holiday/get',verifyToken, holiday_controller.get_holiday)
router.post('/holiday/id', verifyToken,holiday_controller.get_holidayById)
router.put('/holiday/update', verifyToken,holiday_controller.update_holiday)
router.delete('/holiday/delete',verifyToken, holiday_controller.delete_holiday)



// holiday category
const holiday_category_controller = require("../master_data_module/holiday_category/holiday_category_controller");
router.post('/holidaycate/add',verifyToken, holiday_category_controller.create_holidaycate)
router.post('/holidaycate/get',verifyToken, holiday_category_controller.get_holidaycate)
router.post('/holidaycate/id',verifyToken, holiday_category_controller.get_holidaycateById)
router.put('/holidaycate/update',verifyToken,holiday_category_controller.update_holidaycate)
// router.delete('/holidaycate/delete', holiday_category_controller.delete_holidaycate)

//holiday
const header_title_controller = require("../master_data_module/header_title/header_title_controller")
router.post('/header/title/add',verifyToken, header_title_controller.add_header_title);
router.post('/header/title/get',verifyToken, header_title_controller.get_header_title);
router.post('/header/title/id',verifyToken, header_title_controller.get_header_title_id);
router.put('/header/title/update',verifyToken, header_title_controller.update_header_title);

// roles
const roles_controller = require("../master_data_module/roles/roles_controller");
router.post('/role/add',verifyToken, roles_controller.create_role) 
router.post('/role/get',verifyToken, roles_controller.get_role)  
router.post('/role/id',verifyToken, roles_controller.get_roleById) 
router.put('/role/update', verifyToken,roles_controller.update_role) 
router.delete('/role/delete',verifyToken, roles_controller.delete_role)

// route list function
const func_page_controller = require("../master_data_module/function_page/func_page_controller")
router.post('/functionpage/add',verifyToken, func_page_controller.create_funcPage)
router.post('/functionpage/get',verifyToken, func_page_controller.get_funcPage)
router.post('/functionpage/id', verifyToken,func_page_controller.get_funcPageById)
router.put('/functionpage/update', verifyToken,func_page_controller.update_funcPage)
router.delete('/functionpage/delete',verifyToken, func_page_controller.delete_funcPage)

//show user
const show_user_controller = require('../user/show_user/show_user_controller');
router.post('/user/search',verifyToken,show_user_controller.search_user);
router.delete('/user/delete',verifyToken,show_user_controller.delete_user);
// update user
const user_update_controller = require('../user/update/user_update_controller');
router.put('/user/update',verifyToken,user_update_controller.update_user);

// provinces
const province_controller = require('../master_data_module/provinces/province_controller');
router.post('/province/add',verifyToken,province_controller.add_province);
router.post('/province/get',verifyToken,province_controller.get_province);
router.post('/province/id',verifyToken,province_controller.get_province_id);
router.put('/province/update',verifyToken,province_controller.update_province);
router.delete('/province/delete',verifyToken,province_controller.delete_province);

// districts
const district_controller = require('../master_data_module/districts/district_controller');
router.post('/districts/add',verifyToken,district_controller.add_districts);
router.post('/districts/get',verifyToken,district_controller.get_districts);
router.post('/districts/id',verifyToken,district_controller.get_districts_id);
router.put('/districts/update',verifyToken,district_controller.update_districts);
router.delete('/districts/delete',verifyToken,district_controller.delete_districts);

// sub_header
const sub_header_controller = require('../master_data_module/sub_header/sub_header_controller');
router.post('/sub-header/add',verifyToken,sub_header_controller.create_sub_header);





function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

//export route to  server file
module.exports = router;