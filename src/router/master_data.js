//call express function
const { Router } = require('express');

//set router
const router = Router();




//dropdown 
//--- depart
const drop_down_depart_controller = require("../dropdown/depart/dropdown_depart_controller")
router.post('/dropdown/depart', verifyToken, drop_down_depart_controller.drop_down_depart)
//--- roles
const drop_down_roles_controller = require("../dropdown/roles/dropdown_roles_controller")
router.post('/dropdown/roles', verifyToken, drop_down_roles_controller.drop_down_roles)
//---holiday category
const drop_down_holiday_cate_controller = require("../dropdown/holiday_category/dropdown_holiday_cate_controller")
router.post('/dropdown/holidaycate', verifyToken, drop_down_holiday_cate_controller.drop_down_holidaycate)

// depart
const depart_controller = require("../depart/depart_controller")
router.post('/depart/add', depart_controller.create_depart)
router.post('/depart/get', depart_controller.get_depart)
router.post('/depart/id', depart_controller.get_departById)
router.put('/depart/update', depart_controller.update_depart)
router.delete('/depart/delete', depart_controller.delete_depart)

// roles
const roles_controller = require("../roles/roles_controller");
router.post('/role/add', roles_controller.create_role)
router.post('/role/get', roles_controller.get_role)
router.post('/role/id', roles_controller.get_roleById)
router.put('/role/update', roles_controller.update_role)
router.delete('/role/delete', roles_controller.delete_role)
// route list function

// holiday category
const holiday_category_controller = require("../holiday_category/holiday_category_controller");
router.post('/holidaycate/add', holiday_category_controller.create_holidaycate)
router.post('/holidaycate/get', holiday_category_controller.get_holidaycate)
router.post('/holidaycate/id', holiday_category_controller.get_holidaycateById)
router.put('/holidaycate/update', holiday_category_controller.update_holidaycate)
router.delete('/holidaycate/delete', holiday_category_controller.delete_holidaycate)

//holiday
const holiday_controller = require("../holiday/holiday_controller")
router.post('/holiday/add', holiday_controller.create_holiday)
router.post('/holiday/get', holiday_controller.get_holiday)
router.post('/holiday/id', holiday_controller.get_holidayById)
router.put('/holiday/update', holiday_controller.update_holiday)
router.delete('/holiday/delete', holiday_controller.delete_holiday)





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