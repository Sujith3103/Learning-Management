const express = require('express');
const router = express.Router();
// const registerUser = require('../controllers/auth_controller');
// const loginUser = require('../controllers/auth_controller');
const { registerUser, loginUser } = require('../controllers/auth_controller');

router.post('/register', registerUser);
router.post('/login', loginUser)

module.exports = router;