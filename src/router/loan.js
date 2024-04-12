//call express function
const { Router } = require('express');
//set router
const router = Router();

// customer finish...
const customer_controller = require("../loan_module/customer/customer_controller");
router.post('/customer/add', verifyToken,customer_controller.add_customer);
router.put('/customer/update', verifyToken,customer_controller.update_customer);
router.post('/customer/get', verifyToken,customer_controller.get_customer)
router.post('/customer/id', verifyToken,customer_controller.get_customer_id)
router.delete('/customer/delete', verifyToken,customer_controller.delete_customer);
router.put('/assigned/update', verifyToken,customer_controller.update_assigned);
router.post('/customer/search', verifyToken,customer_controller.search_customer); // ລົງຖະບຽນລູກຄ້າ, ຂໍ້ມູນລູກຄ້າ, ຊ່ອງຄົ້ນຂໍ້ຫາລູກຄ້າ ໃຊ້ຮ່ວມກັນ

// picture identified
const identified_controller  = require("../loan_module/picture_identified/identified_controller");
router.post('/identified/add', verifyToken,identified_controller.create_picture_identified);
router.post('/identified/get', verifyToken,identified_controller.get_identified);
router.put('/identified/update', verifyToken,identified_controller.update_identified);
//guarantor customer
const customer_guarantor_controller = require("../loan_module/customer_quarantor/customer_guarantor_controller");
router.post('/customer/guarantor/add', verifyToken,customer_guarantor_controller.add_customer_guaantor);
router.post('/customer/guarantor/search', verifyToken,customer_guarantor_controller.search_customer_guarantor);
router.put('/customer/guarantor/update', verifyToken,customer_guarantor_controller.update_customer_guarantor);
router.delete('/customer/guarantor/delete', verifyToken,customer_guarantor_controller.delete_customer_guarantor);



//asset type customer
const asset_type_controller = require("../loan_module/asset_type_customer/asset_type_cust_controller")
router.post('/assetType/add', verifyToken,asset_type_controller.create_asset_type)
router.post('/assetType/get', verifyToken,asset_type_controller.get_asset_type)
router.post('/assetType/id', verifyToken,asset_type_controller.get_asset_TypeById)
router.post('/assetType/search', verifyToken,asset_type_controller.search_asset_type) // ໃຊ້ສຳລັບຕໍ່ api ເພື່ອເພີ່ມຂໍ້ມູນໃນໜ້າ tbl_credit_customer ທີ່ເປັນ dropdown
router.put('/assetType/update', verifyToken,asset_type_controller.update_asset_type)
router.delete('/assetType/delete', verifyToken,asset_type_controller.delete_asset_type)


//asset type customer
const asset_credit_controller = require("../loan_module/asset_credit_customer/asset_credit_cust_controller")
router.post('/assetCredit/add', verifyToken,asset_credit_controller.create_asset_credit)
router.post('/assetCredit/get', verifyToken,asset_credit_controller.get_asset_credit)
router.post('/assetCredit/search', verifyToken,asset_credit_controller.search_asset_credit)
router.put('/assetCredit/update', verifyToken,asset_credit_controller.update_asset_credit)
router.put('/assetCredit/update/checking', verifyToken,asset_credit_controller.update_check_asset_credit_customer)
router.delete('/assetCredit/delete', verifyToken,asset_credit_controller.delete_asset_credit)


// currency
const currency_controller = require("../loan_module/currency/currency_controller")
router.post('/currency/add', verifyToken,currency_controller.create_currency)
router.post('/currency/get', verifyToken,currency_controller.get_currency)
router.post('/currency/id', verifyToken,currency_controller.get_currencyById)
router.put('/currency/update', verifyToken,currency_controller.update_currency)
router.delete('/currency/delete', verifyToken,currency_controller.delete_currency)

//loan contract
const loan_contract_controller = require("../loan_module/loan_contract/loan_contract_controller")
router.post('/contract/add', verifyToken,loan_contract_controller.create_loan_contract);
router.post('/search/contract/customer', verifyToken,loan_contract_controller.search_customer_add_contract);
router.post('/search/contract', verifyToken,loan_contract_controller.search_loan_contract);
router.put('/update/contract', verifyToken,loan_contract_controller.update_loan_contract);
router.delete('/delete/contract', verifyToken,loan_contract_controller.delete_loan_contract);

//loan request
const loan_request_controller = require("../loan_module/loan_request/loan_request_controller")
router.post('/loanRequest/add', verifyToken,loan_request_controller.create_loan_request);
router.post('/loanRequest/get', verifyToken,loan_request_controller.get_loan_request);
router.put('/loanRequest/update', verifyToken,loan_request_controller.update_loan_request);
router.put('/loanRequest/evaluate/update', verifyToken,loan_request_controller.update_evaluate_status);
router.put('/loanRequest/comment/update', verifyToken,loan_request_controller.update_approve_comment);
router.delete('/loanRequest/delete', verifyToken,loan_request_controller.delete_loan_request);

//loan request status
const loan_status_controller = require("../loan_module/loan_status/loan_status_controller")
router.post('/loanStatus/add', verifyToken,loan_status_controller.create_loan_request_status);
router.post('/loanStatus/get', verifyToken,loan_status_controller.get_loan_request_status);
router.post('/loanStatus/search', verifyToken,loan_status_controller.search_loan_request_status);

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