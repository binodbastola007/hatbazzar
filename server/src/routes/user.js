const express = require('express');
const router = express.Router();
const { registerUser, loginUser, registerGoogleUser, loginGoogleUser } = require('../controllers/user');

router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/register-googleuser', registerGoogleUser)

router.post('/login-googleuser', loginGoogleUser)

module.exports = router;