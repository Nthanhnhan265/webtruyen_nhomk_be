const { loginUser } = require('@services/userlogin.service');
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');

// ==========================
// Xử lý Đăng Nhập
// ==========================
async function handleLoginUser(req, res, next) {
  const { username, password } = req.body;

  try {
    // Gọi service loginUser để xử lý đăng nhập
    const result = await loginUser(username, password);

    // Kiểm tra kết quả từ service và phản hồi
    if (!result.success) {
      // Trả về lỗi nếu đăng nhập không thành công
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }

    // Tạo token JWT trực tiếp thay vì gọi createToken
    const token = jwt.sign(
      { userId: result.data.userId, username: result.data.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Đặt cookie authToken nếu đăng nhập thành công
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
    });

    // Trả về kết quả đăng nhập thành công
    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
    });
  } catch (error) {
    console.error(error);
    return next(createHttpError(500, 'Lỗi khi đăng nhập'));
  }
}

module.exports = {
  handleLoginUser,
};
