const createHttpError = require('http-errors');
const { registerUser,loginUser } = require('@services/userregister.service');  // Sử dụng đúng import
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
  console.log('Registering user with data:', { username, email, password, confirmPassword }); 

  // Kiểm tra nếu password và confirmPassword không khớp
  if (password !== confirmPassword) {
    return next(createHttpError(400, 'Password and confirm password do not match'));
  }

  try {
    // Gọi service registerUser để xử lý việc đăng ký người dùng
    const result = await registerUser({ username, email, password, confirmPassword });  // Gọi trực tiếp registerUser
  
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
    // Log thông tin lỗi để debug
    console.error('Error in handleRegisterUser:', error);
    return next(createHttpError(500, 'Error registering user', { details: error.message }));
  }
}

// // ==========================
// // User Handler Functions
// // ==========================

// // LOGIN USER
// /**
//  * Handle login request for users.
//  * @param {Object} req - Request object.
//  * @param {Object} res - Response object.
//  * @param {Function} next - Next middleware function.
//  */
// async function handleLoginUser(req, res, next) {
//   const { email, password } = req.body;
//   console.log('Logging in user with data:', { email, password });

//   try {
//     // Call service to handle user login
//     const result = await loginUser({ email, password });

//     // Successful login, return user info
//     return res.status(200).json({
//       success: true,
//       status: 200,
//       message: result.message,
//       data: result.data,
//     });
//   } catch (error) {
//     // Log error information for debugging
//     console.error('Error in handleLoginUser:', error);
//     return next(createHttpError(500, 'Error logging in user', { details: error.message }));
//   }
// }

module.exports = {
  handleRegisterUser,
};
