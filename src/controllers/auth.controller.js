const { loginValidate, registerValidate } = require('@helper/validation')
const { findUserByEmail, registerUser } = require('@services/auth.service.js')
const createHttpError = require('http-errors')
const message = require('@root/message.js')
const { JWT_SECRET } = process.env // Lấy JWT secret từ biến môi trường
const {
  signAccessToken,
  signRefreshToken,
} = require('@services/jwt.service.js')
const { verifyRefreshToken } = require('../services/jwt.service')
//LOGIN TO USER, ADMIN
/** Xử lý yêu cầu đăng nhập và tạo token mới
 *  @param {Object} req -  Đối tượng yêu cầu.
 *  @param {Object} res -  Đối tượng phản hồi
 *  @param {Object} next - Hàm gọi tiếp theo trong middleware.
 */
async function handleLogin(req, res, next) {
  try {
    //=========== Lấy dữ liệu =============//
    const { email, password } = req.body

    //=========== xử lý dữ liệu ===========//
    // kiểm tra nếu dữ liệu không hợp lệ
    const { error } = loginValidate(req.body)
    if (error) {
      next(error)
    }
    // Kiểm email có tồn tại trong db hay không
    const user = await findUserByEmail(email)
    if (!(await user.isRightPassword(password))) {
      throw createHttpError.Unauthorized(message.auth.unauthorized)
    }
    // trả về JWT nếu nhập đúng tài khoản mật khẩu
    const accessToken = await signAccessToken(user.id)
    const refreshToken = await signRefreshToken(user.id)

    // xóa trường mật khẩu trước khi trả về
    const userData = user.toJSON()

    //=========== trả về dữ liệu ==========//
    return res.status(200).json({
      success: true,
      status: 200,
      data: {
        id: userData.id,
        email: userData.email,
        username: userData.username,
        avatar: userData.avatar,
      },
      token: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      links: [],
    })
  } catch (error) {
    next(error)
  }
}
// CREATE USER
/**
 * Xử lý yêu cầu đăng ký người dùng mới.
 * @param {Object} req - Đối tượng yêu cầu.
 * @param {Object} res - Đối tượng phản hồi.
 * @param {Function} next - Hàm gọi tiếp theo trong middleware.
 */
async function handleRegister(req, res, next) {
  try {
    const { username, email, password } = req.body
    const { error } = registerValidate(req.body)
    if (error) {
      next(error)
    }
    // Gọi service registerUser để xử lý việc đăng ký người dùng
    const result = await registerUser({
      username,
      email,
      password,
    })
    // Xử lý kết quả từ service
    if (!result.success) {
      // Trả về lỗi tương ứng nếu đăng ký không thành công
      return res.status(200).json({
        success: true,
        status: 201,
        message: message.auth.createSuccess,
        data: result,
        links: [],
      })
    }

    // Thành công, trả về thông tin người dùng
    return res.status(201).json({
      success: true,
      status: 201,
      message: result.message,
      data: result.data,
      links: [],
    })
  } catch (error) {
    console.log(error)
    if (error.status === 400 || error.status === 409) {
      return next(createHttpError(error.status, error.message))
    }
    // Lỗi khác
    return next(
      createHttpError(500, 'Error registering user', {
        details: error.message,
      }),
    )
  }
}
//REFRESH TOKEN
/** Xử lý yêu cầu tạo token mới
 *  @param {Object} req -  Đối tượng yêu cầu.
 *  @param {Object} res -  Đối tượng phản hồi
 *  @param {Object} next - Hàm gọi tiếp theo trong middleware.
 */
async function handleRefreshToken(req, res, next) {
  try {
    //=========== Lấy dữ liệu =============//
    const { refreshToken } = req.body

    //=========== xử lý dữ liệu ===========//
    // kiểm tra nếu dữ liệu không hợp lệ
    if (!refreshToken)
      return next(createHttpError.BadRequest(message.auth.missedToken))
    // Lấy id từ token
    const { userId } = await verifyRefreshToken(refreshToken)
    // cấp 1 cặp token mới
    const accessToken = await signAccessToken(userId)
    const refToken = await signRefreshToken(userId)

    //=========== trả về dữ liệu ==========//
    return res.status(200).json({
      success: true,
      status: 200,
      token: {
        accessToken,
        refToken,
      },
      links: [],
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  handleLogin,
  handleRefreshToken,
  handleRegister,
}
//LOGIN TO ADMIN
/** Xử lý yêu cầu đăng nhập và tạo token mới
 *  @param {Object} req -  Đối tượng yêu cầu.
 *  @param {Object} res -  Đối tượng phản hồi
 *  @param {Object} next - Hàm gọi tiếp theo trong middleware.
 */
// async function handleLoginUser(req, res, next) {
//   const { username, password } = req.body
//   try {
//     // Gọi service loginUser để xử lý đăng nhập
//     const result = await loginUser(username, password)
//     // Kiểm tra kết quả từ service và phản hồi
//     if (!result.success) {
//       // Trả về lỗi nếu đăng nhập không thành công
//       return res.status(400).json({
//         success: false,
//         message: result.message,
//       })
//     }
//     // Trả về kết quả đăng nhập thành công
//     return res.status(200).json(result)
//   } catch (error) {
//     console.error(error)
//     return next(createHttpError(500, 'Lỗi khi đăng nhập'))
//   }
// }
