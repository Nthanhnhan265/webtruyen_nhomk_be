const express = require('express');
const router = express.Router();
const {handleRegisterUser} = require('../controllers/userRegister.controller'); // Điều chỉnh tên cho rõ ràng
const { handleLoginUser } = require('../controllers/userLogin.controller');
// Route cho đăng ký người dùng
router.post('/', handleRegisterUser);
router.post('/', handleLoginUser);
module.exports = router;
