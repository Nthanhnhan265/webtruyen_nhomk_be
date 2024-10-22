const express = require('express');
const router = express.Router();
const userlogin = require("../controllers/userlogin.controller");

router.post('/register', userlogin.register);
router.post('/login', userlogin.login);

module.exports = router;
