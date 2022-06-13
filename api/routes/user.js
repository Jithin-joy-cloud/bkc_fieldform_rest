const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const UserController = require('../controller/user_controller')

router.post('/register', UserController.user_register);
router.post('/login', UserController.user_login);
router.delete('/delete/:userId', UserController.user_delete)

module.exports = router;