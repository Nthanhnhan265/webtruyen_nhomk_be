const { loginValidate } = require('@helper/validation')
const { findUserByEmail } = require('@services/auth.service.js')
const createHttpError = require('http-errors')
const message = require('@root/message.js')
/**
 *
 *
 *
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

    //=========== trả về dữ liệu ==========//
    return res.status(200).json({
      success: true,
      status: 200,
      data: user,
      links: [],
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  handleLoginAdmin,
}
