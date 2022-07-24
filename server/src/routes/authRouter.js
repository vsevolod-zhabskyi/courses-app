const express = require('express');
const AuthController = require('../controllers/AuthController');
const credentialsValidation = require('../validators/credentialsValidation');

const router = express();

router.post('/register', credentialsValidation, AuthController.register);
router.post('/login', credentialsValidation, AuthController.login);
router.get('/check', AuthController.check);

module.exports = router;
