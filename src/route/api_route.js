//call express function
const { Router } = require('express');

//set router
const router = Router();


//call controllers function
const login_controller = require('../controllers/function/login_controller');



// route list function
router.post('/login', login_controller.login);


//export route to  server file
module.exports = router;