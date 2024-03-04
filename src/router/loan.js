//call express function
const { Router } = require('express');

//set router
const router = Router();

// customer
const customer_controller = require("../loan_module/customer/customer_controller")
router.post('/customer/add', verifyToken,customer_controller.create_customer)
router.post('/customer/get', verifyToken,customer_controller.get_customer)
router.post('/customer/name', verifyToken,customer_controller.get_customerByName)
router.post('/customer/phone', verifyToken,customer_controller.get_customerByphone)
router.put('/customer/update', verifyToken,customer_controller.update_customer)
router.delete('/customer/delete', verifyToken,customer_controller.delete_customer)
// customer data
const cust_data_controller = require("../loan_module/customer_data/cust_data_controller")
router.post('/customer/data/search', verifyToken,cust_data_controller.get_customer_Data)

//asset type customer
const asset_type_controller = require("../loan_module/asset_type_customer/asset_type_cust_controller")
router.post('/assetType/add', verifyToken,asset_type_controller.create_asset_type)
router.post('/assetType/get', verifyToken,asset_type_controller.get_asset_type)
router.post('/assetType/id', verifyToken,asset_type_controller.get_asset_TypeById)
router.put('/assetType/update', verifyToken,asset_type_controller.update_asset_type)
router.delete('/assetType/delete', verifyToken,asset_type_controller.delete_asset_type)


//asset type customer
const asset_credit_controller = require("../loan_module/asset_credit_customer/asset_credit_cust_controller")
router.post('/assetCredit/add', verifyToken,asset_credit_controller.create_asset_credit)
router.post('/assetCredit/get', verifyToken,asset_credit_controller.get_asset_credit)
router.put('/assetCredit/update', verifyToken,asset_credit_controller.update_asset_credit)
router.delete('/assetCredit/delete', verifyToken,asset_credit_controller.delete_asset_credit)


// currency
const currency_controller = require("../loan_module/currency/currency_controller")
router.post('/currency/add', verifyToken,currency_controller.create_currency)
router.post('/currency/get', verifyToken,currency_controller.get_currency)
router.post('/currency/id', verifyToken,currency_controller.get_currencyById)
router.put('/currency/update', verifyToken,currency_controller.update_currency)
router.delete('/currency/delete', verifyToken,currency_controller.delete_currency)

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