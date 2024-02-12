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

// roles
const roles_controller = require("../master_data_module/roles/roles_controller");
router.post('/role/add',verifyToken, roles_controller.create_role) //T
router.post('/role/get',verifyToken, roles_controller.get_role)  //T
router.post('/role/id',verifyToken, roles_controller.get_roleById) //T
router.put('/role/update', verifyToken,roles_controller.update_role) //T
router.delete('/role/delete',verifyToken, roles_controller.delete_role)

// route list function
const func_page_controller = require("../master_data_module/function_page/func_page_controller")
router.post('/functionpage/add',verifyToken, func_page_controller.create_funcPage)
router.post('/functionpage/get',verifyToken, func_page_controller.get_funcPage)
router.post('/functionpage/id', verifyToken,func_page_controller.get_funcPageById)
router.put('/functionpage/update', verifyToken,func_page_controller.update_funcPage)
router.delete('/functionpage/delete',verifyToken, func_page_controller.delete_funcPage)

const show_user_controller = require('../user/show_user/show_user_controller');
router.post('/user/show',verifyToken,show_user_controller.show_user);
router.post('/user/search',verifyToken,show_user_controller.show_userByData);






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