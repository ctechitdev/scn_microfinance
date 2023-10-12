//call express function
const { Router } = require('express');

//set router
const router = Router();


//call controllers function
const login_controller = require('../controllers/function/login_controller');
const register_controller = require('../controllers/function/register_controller');



// route list function
router.post('/login', login_controller.login);
router.post('/register', register_controller.register_user);


//export route to  server file
module.exports = router;