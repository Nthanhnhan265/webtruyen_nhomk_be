const createHttpError = require('http-errors');
const {registerUserService} = require('@services/userregister.service');
const message = require('@root/message');

// ==========================
// User Handler Functions
// ==========================

// CREATE USER
/**
 * Xử lý yêu cầu đăng ký người dùng mới.
 * @param {Object} req - Đối tượng yêu cầu.
 * @param {Object} res - Đối tượng phản hồi.
 * @param {Function} next - Hàm gọi tiếp theo trong middleware.
 */
async function handleRegisterUser(req, res, next) {
  const { username, email, password, confirmPassword } = req.body;

  // Kiểm tra nếu password và confirmPassword không khớp
  if (password !== confirmPassword) {
    return next(createHttpError(400, 'Password and confirm password do not match'));
  }

  try {
    // Gọi service registerUser để xử lý việc đăng ký người dùng
    const result = await registerUserService.registerUser({ username, email, password, confirmPassword });

    if (!result.success) {
      // Nếu không thành công, trả về lỗi
      return next(createHttpError(400, result.message));
    }

    // Thành công, trả về thông tin người dùng
    return res.status(201).json({
      success: true,
      status: 201,
      message: result.message,
      data: result.data,
      links: [],
    });
  } catch (error) {
    return next(createHttpError(500, 'Error registering user', { details: error.message }));
  }
}

module.exports = {
  handleRegisterUser,
};
