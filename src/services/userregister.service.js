const bcrypt = require('bcryptjs');  // Để mã hóa mật khẩu
const jwt = require('jsonwebtoken'); // Để tạo token cho user
const User = require('../models/user.model');  // Import model User
const createError = require('http-errors');
const message = require('@root/message');
const { JWT_SECRET } = process.env;  // Sử dụng biến môi trường chứa JWT secret

// ==========================
// User Registration Service
// ==========================

/**
 * Đăng ký người dùng mới.
 * @param {Object} userData - Dữ liệu của người dùng (username, email, password, confirmPassword)
 * @returns {Promise<Object>} - Trả về thông tin người dùng hoặc lỗi
 */
async function registerUser(userData) {
    const { username, email, password, confirmPassword } = userData;
  
    // Kiểm tra nếu password và confirmPassword không khớp
    if (password !== confirmPassword) {
      throw createError(400, 'Mật khẩu và xác nhận mật khẩu không khớp');
    }
  
    // Kiểm tra nếu người dùng đã tồn tại
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw createError(409, message.user.emailExisted);
    }
  
    // Mã hóa mật khẩu trước khi lưu vào database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // Tạo người dùng mới với role_id là 2, status là 1 và avatar mặc định
    try {
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role_id: 2,  // Thiết lập role_id là 2
        status: 1,    // Thiết lập status là 1
        avatar: 'default_avatar.png', // Hoặc tên avatar mặc định khác nếu có
      });
  
      // Tạo JWT token
      const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
        expiresIn: '1h',  // Token hết hạn sau 1 giờ
      });
  
      return {
        success: true,
        message: 'Đăng ký thành công!',
        data: {
          userId: newUser.id,
          username: newUser.username,
          email: newUser.email,
          token,
        },
      };
    } catch (error) {
      throw createError(500, message.user.createFailed);
    }
  }
  

module.exports = {
  registerUser,
};
