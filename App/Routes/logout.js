const express = require('express');
const router = express.Router();

const logoutController = require('../Controllers/logout');

router.get('/logout', logoutController.logout);

module.exports = router;