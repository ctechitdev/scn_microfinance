//call express function
const { Router } = require('express');

//set router
const router = Router();


//Login
const login_controller = require("../login/login_controller");
router.post('/login', login_controller.login);

//user 
const register_controller = require('../user/register/register_controller');
router.post('/register', register_controller.register_user);

  


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