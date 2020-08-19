const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user')

router.post('/adminsignup', userCtrl.adminsignup );
router.post('/customersignup', userCtrl.signup );


router.post('/login', userCtrl.login);

module.exports = router;
