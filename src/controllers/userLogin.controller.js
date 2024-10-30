const createHttpError = require('http-errors');
const User = require('../models/user.model'); // Import model User
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env; // Lấy JWT secret từ biến môi trường

// ==========================
// Xử lý Đăng Nhập
// ==========================

async function handleLoginUser(req, res, next) {
  const { username, password } = req.body;

  try {
    // Tìm người dùng theo username
    const user = await User.findOne({ where: { username } });

    // Kiểm tra nếu người dùng không tồn tại
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Tên đăng nhập không tồn tại',
      });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Mật khẩu không chính xác',
      });
    }

    // Tạo token nếu đăng nhập thành công
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Trả về kết quả đăng nhập thành công
    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        userId: user.id,
        username: user.username,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, 'Lỗi khi đăng nhập'));
  }
}

module.exports = {
  handleLoginUser,
};
