const express = require('express');
const router = express.Router();

const profileControllers = require('../Controllers/profile');
const {verifyJWT} = require('../Middlewares/verifyJWT');

router.get('/profile',verifyJWT, profileControllers.getProfile);

module.exports = router;