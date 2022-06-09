const express = require ('express');
const { registerUser ,loginUser } = require('../controllers/authControllers');
const router = express.Router();
const User = require ('../models/User')


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router ;


