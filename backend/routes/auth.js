const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = require('../controllers/authController')


router.post('/register',authController.register)

router.post('/login',authController.login)

module.exports = router 