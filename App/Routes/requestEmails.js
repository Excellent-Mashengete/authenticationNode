
const express = require('express');
const router = express.Router();


const { RequestVerifiyingEmail, RequestOTP_PIN } = require('../Controllers/RequestEmails');


router.post('/reqverifyemail', RequestVerifiyingEmail);
router.post('/reqOTPemail', RequestOTP_PIN);

module.exports = router;