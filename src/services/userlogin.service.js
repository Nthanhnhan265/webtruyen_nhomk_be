const bcrypt = require('bcryptjs'); // Để so sánh mật khẩu đã được băm
const jwt = require('jsonwebtoken'); // Để tạo token cho người dùng
const User = require('../models/user.model'); // Import model User
const createError = require('http-errors');
const { JWT_SECRET } = process.env; // Sử dụng biến môi trường chứa JWT secret

// ==========================
// Dịch vụ Đăng Nhập Người Dùng
// ==========================

/**
 * Hàm đăng nhập người dùng.
 * @param {Object} loginData - Dữ liệu đăng nhập của người dùng (username, password).
 * @returns {Promise<Object>} - Trả về thông tin người dùng hoặc lỗi.
 */
async function loginUser(loginData) {
  const { username, password } = loginData; // Sửa để nhận username thay vì email

  // Kiểm tra xem người dùng có tồn tại không
  const user = await User.findOne({ where: { username } }); // Tìm người dùng theo username
  if (!user) {
    throw createError(401, 'Tên người dùng hoặc mật khẩu không hợp lệ');
  }

  // So sánh mật khẩu với mật khẩu đã được băm
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw createError(401, 'Tên người dùng hoặc mật khẩu không hợp lệ');
  }

  // Tạo token JWT
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { // Sửa payload trong token
    expiresIn: '1h', // Token hết hạn sau 1 giờ
  });

  return {
    success: true,
    message: 'Đăng nhập thành công!',
    data: {
      userId: user.id,
      username: user.username, // Sử dụng username
      email: user.email,
      token,
    },
  };
}

module.exports = {
  loginUser,
};
