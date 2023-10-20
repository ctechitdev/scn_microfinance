//call express function
const { Router } = require('express');

//set router
const router = Router();


//call controllers function
const login_controller = require('../controllers/function/login_controller');
const register_controller = require('../controllers/function/register_controller');
const update_user_controller = require('../controllers/function/user_update_controller');
const dropdown_controller = require('../controllers/function/dropdown_controller');



// route list function
router.post('/login', login_controller.login);
router.post('/register', register_controller.register_user);
router.post('/update_user',verifyToken, update_user_controller.update_user);

//dropdown data
router.get('/depart',verifyToken, dropdown_controller.show_depart);
router.get('/provice',verifyToken, dropdown_controller.show_provice);
router.post('/district',verifyToken, dropdown_controller.show_distric);



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