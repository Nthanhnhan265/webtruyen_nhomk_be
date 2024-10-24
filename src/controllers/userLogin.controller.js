const createHttpError = require('http-errors');
const User = require('../models/user.model'); // Import model User // Import model User
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env; // Lấy JWT secret từ biến môi trường

// ==========================
// Xử lý Đăng Nhập
// ==========================

async function handleLoginUser(req, res, next) {
  const { username, password } = req.body; // Thay email bằng username

  try {
    // Tìm người dùng theo username
    const user = await User.findOne({ where: { username } }); // Sửa tìm kiếm theo username

    // Kiểm tra nếu người dùng không tồn tại
    if (!user) {
      return next(createHttpError(404, 'Người dùng không tồn tại'));
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createHttpError(401, 'Mật khẩu không chính xác'));
    }

    // Tạo token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { // Sửa thông tin trong token
      expiresIn: '1h', // Token hết hạn sau 1 giờ
    });

    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        userId: user.id,
        username: user.username, // Sử dụng username
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error('Lỗi trong handleLoginUser:', error);
    return next(createHttpError(500, 'Lỗi khi đăng nhập'));
  }
}

module.exports = {
  handleLoginUser,
};
