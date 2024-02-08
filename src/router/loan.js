//call express function
const { Router } = require('express');

//set router
const router = Router();

// customer
const customer_controller = require("../folder_loan/customer/customer_controller")
router.post('/customer/add', verifyToken,customer_controller.create_customer)
router.post('/customer/get', verifyToken,customer_controller.get_customer)
router.post('/customer/name', verifyToken,customer_controller.get_customerByName)
router.post('/customer/phone', verifyToken,customer_controller.get_customerByphone)
router.put('/customer/update', verifyToken,customer_controller.update_customer)
router.delete('/customer/delete', verifyToken,customer_controller.delete_customer)
// customer data
const cust_data_controller = require("../folder_loan/customer_data/cust_data_controller")
router.post('/customer/data/search', verifyToken,cust_data_controller.get_customer_Data)

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