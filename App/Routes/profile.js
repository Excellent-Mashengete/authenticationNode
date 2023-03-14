const express = require('express');
const router = express.Router();

const profileControllers = require('../Controllers/profile');
const { verifyJWT } = require('../Middlewares/verifyJWT');
const upload = require('../Middlewares/profileUpdate');

router.get('/profile', verifyJWT, profileControllers.getProfile);
router.patch('/profile', [verifyJWT, upload.single("image")], profileControllers.updateProfile);

module.exports = router;