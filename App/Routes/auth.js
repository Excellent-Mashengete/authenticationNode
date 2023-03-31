const express = require('express');
const router = express.Router();

//Middlewares
const { verifyJWT } = require('../Middlewares/verifyJWT');
const { checkDuplicateUsernameOrEmail } = require('../Middlewares/verifySignup');

//controllers
const { login } = require('../Controllers/login');
const { register } = require('../Controllers/register');
const { logout } = require('../Controllers/logout');
const { verifyUser } = require('../Controllers/verifyregistration');
const { VerifyOTP } = require('../Controllers/verifyOTPPinOnLogin');

router.post('/login', login); // login a user
router.post('/register', checkDuplicateUsernameOrEmail, register); // register a user
router.get('/logout', verifyJWT, logout); //logout a user
router.get('/user/verify/:id/:token', verifyUser); //verify registration
router.post('/userotp', VerifyOTP)
module.exports = router;