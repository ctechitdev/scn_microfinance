//call express function
const { Router } = require('express');

//set router
const router = Router();

 
 

//dropdown 
//--- depart
const drop_down_depart_controller = require("../dropdown/depart/dropdown_depart_controller")
router.post('/dropdown/depart',verifyToken,drop_down_depart_controller.drop_down_depart)

// depart
const depart_controller = require("../depart/depart_controller")
router.post('/depart/add',depart_controller.create_depart)
router.post('/depart/get',depart_controller.get_depart)
router.post('/depart/id',depart_controller.get_departById)
router.put('/depart/update', depart_controller.update_depart)
router.delete('/depart/delete', depart_controller.delete_depart)
// route list function



 



function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
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