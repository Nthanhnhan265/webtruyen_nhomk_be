const { loginValidate } = require('@helper/validation')
const { findUserByEmail } = require('@services/auth.service.js')
const createHttpError = require('http-errors')
const message = require('@root/message.js')
const {
  signAccessToken,
  signRefreshToken,
} = require('@services/jwt.service.js')
const { verifyRefreshToken } = require('../services/jwt.service')

//LOGIN TO ADMIN
/** Xử lý yêu cầu đăng nhập và tạo token mới
 *  @param {Object} req -  Đối tượng yêu cầu.
 *  @param {Object} res -  Đối tượng phản hồi
 *  @param {Object} next - Hàm gọi tiếp theo trong middleware.
 */
async function handleLoginAdmin(req, res, next) {
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

    //=========== trả về dữ liệu ==========//
    return res.status(200).json({
      success: true,
      status: 200,
      data: user,
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
  handleLoginAdmin,
  handleRefreshToken,
}
