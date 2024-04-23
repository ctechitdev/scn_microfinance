//call express function
const { Router } = require('express');
//set router
const router = Router();

// CIF
const cif_controller = require("../finance_module/cif/cif_controller")
router.post('/search/cif/customer', verifyToken,cif_controller.search_customer_add_cif);
router.post('/cif/add', verifyToken,cif_controller.create_cif);
router.post('/cif/get', verifyToken,cif_controller.get_cif);
router.post('/cif/id', verifyToken,cif_controller.get_cif_ById);
// router.put('/cif/update', verifyToken,cif_controller.update_cif);

//account
const account_controller = require("../finance_module/account/account_controller")
router.post('/account/add', verifyToken,account_controller.create_account)
router.post('/account/get', verifyToken,account_controller.get_account)
router.post('/account/id', verifyToken,account_controller.get_account_Id) 
router.post('/account/number', verifyToken,account_controller.get_account_number) 
router.post('/account/firstname', verifyToken,account_controller.get_account_customer_firstname) 


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