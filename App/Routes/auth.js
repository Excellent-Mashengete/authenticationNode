const express = require('express');
const router = express.Router();

const { checkDuplicateUsernameOrEmail } = require('../Middlewares/verifySignup');
const { login } = require('../Controllers/login');
const { register } = require('../Controllers/register');
const { logout } = require('../Controllers/logout');
const { verifyJWT } = require('../Middlewares/verifyJWT');

router.post('/login', login);
router.post('/register', checkDuplicateUsernameOrEmail, register);
router.get('/logout', verifyJWT, logout);

module.exports = router;